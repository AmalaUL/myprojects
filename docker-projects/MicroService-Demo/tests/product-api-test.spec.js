require('dotenv').config();

import { test, expect } from '@playwright/test';
import { getProductByName, resetProductsTable } from './utils/db';

const API_URL = process.env.API_URL;

test.describe('API Tests', async () => {


    test('TC-1 Validate GET API and its response', async ({ request }) => {
        const products = await viewProductAPI(request);
        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toBeGreaterThan(0);
        const hasLaptop = products.some(p => p.name === 'Laptop');
        expect(hasLaptop).toBe(true);
    })
    test('TC-2 Validate POST API and add new product', async ({ request }) => {
        const body = {
            name: 'Bracelets',
            price: '455'
        };
        const rows = await addProductAPI(request, body.name, body.price)
        const id = rows.id;
        //Validate in GET list
        const products = await viewProductAPI(request);
        const hasBracelets = products.some(p => p.name === body.name);
        expect(hasBracelets).toBeTruthy();

        //Delete the created data
        await deleteProductAPI(request, id);

    })
    test('TC-3 Validate PUT API and check updated price', async ({ request }) => {
        const body = {
            name: 'T-Shirt',
            price: 780
        }
        //Create new product
        const rows = await addProductAPI(request, body.name, body.price)
        const id = rows.id;
        //update price for newly added product
        const putResponse = await request.put(`${API_URL}/products/${id}`, {
            data: {
                price: 670
            }
        })
        expect(putResponse.status()).toBe(200);

        //validate updated price
        const products = await viewProductAPI(request);
        const updated = products.find(p => p.id === id);
        expect(updated).toBeTruthy();
        expect(updated.price).toBe(670);

        //Delete the created data
        await deleteProductAPI(request, id);
    })
    test('TC-4 Validate DELETE API and check row is not present', async ({ request }) => {
        const body = {
            name: 'Jeans Pants',
            price: 1080
        }
        //Create new product
        const rows = await addProductAPI(request, body.name, body.price);
        const id = rows.id;
        //Delete added product
        await deleteProductAPI(request, id);
        //validate deleted product is not listed
        const products = await viewProductAPI(request);
        const deletedProduct = products.find(p => p.id === id);
        expect(deletedProduct).toBeUndefined();

    })
})

async function viewProductAPI(request) {
    const getResponse = await request.get(`${API_URL}/products`);
    expect(getResponse.status()).toBe(200);
    const products = await getResponse.json();
    return products;
}
async function addProductAPI(request, name, price) {
    const postResponse = await request.post(`${API_URL}/products`, {
        data: { name, price }
    });
    expect(postResponse.status()).toBe(201);
    const rows = await getProductByName(name);
    expect(rows.length).toBe(1);
    expect(rows[0].name).toBe(name);
    expect(rows[0].price).toBe(parseInt(price));
    return rows[0];
}

async function deleteProductAPI(request, id) {
    const deleteResponse = await request.delete(`${API_URL}/products/${id}`);
    expect(deleteResponse.status()).toBe(204);
}