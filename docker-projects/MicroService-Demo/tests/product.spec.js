require('dotenv').config();
import { test, expect } from '@playwright/test';
import { getProductByName } from './utils/db';

test.describe('Products validations', async () => {
    const UI_URL = process.env.UI_URL;

    test.beforeEach('SetUp', async ({ page }) => {
        await page.goto(UI_URL);
    })

    test('TC-1 Validate load products', async ({ page }) => {
        await page.getByRole('button', { name: 'Load Products' }).click();
        await page.waitForSelector('#productList li');
        const laptopItem = page.locator('#productList li').filter({ hasText: 'Laptop' });
        await expect(laptopItem).toBeVisible();
    })
    test('TC-2 Add Product and Validate added products in products list and DB', async ({ page }) => {
        const productName = 'Shoes_' + Date.now();
        const price = '660';
        let item;
        try {
            item = await addProduct(page, productName, price);
            await DBValidation(productName, price);
        } finally {
            if (item) {
                //delete added product
                await deleteProduct(item);
                await validateProductDeletedInDB(productName);
            }
        }
    })

    test('TC-3 Validate price field is updated in UI and DB for existing product', async ({ page }) => {
        const productName = 'Phone_' + Date.now();
        const price = '580';
        const newPrice = '620';
        let item;
        try {
            //add new product
            item = await addProduct(page, productName, price);
            await DBValidation(productName, price);
            //update price for added product
            await updateProduct(item, productName, newPrice);
            await DBValidation(productName, newPrice);
        } finally {
            if (item) {
                //delete added product
                await deleteProduct(item);
                await validateProductDeletedInDB(productName);
            }
        }
    })
})

async function addProduct(page, productName, price) {
    //add new product
    await page.getByRole('textbox', { name: 'Product name' }).fill(productName);
    await page.getByPlaceholder('Price').fill(price);
    await page.getByRole('button', { name: 'Add' }).click();
    //validate added product
    const item = page.locator('#productList li').filter({ hasText: productName });
    await expect(item).toBeVisible();
    return item;
}

async function DBValidation(productName, price) {
    const rows = await getProductByName(productName);
    expect(rows.length).toBe(1);
    expect(rows[0].name).toBe(productName);
    expect(rows[0].price).toBe(parseInt(price));
}

async function updateProduct(locator, productName, newPrice) {
    await locator.getByRole('button', { name: 'Edit' }).click();
    await locator.locator('input').fill(newPrice);
    await locator.getByRole('button', { name: 'Save' }).click();
    await expect(locator.locator('span')).toContainText(`${productName} - $${newPrice}`);
}

async function deleteProduct(locator) {
    //delete products
    await locator.getByRole('button', { name: 'Delete' }).click();
    //await expect(locator).not.toBeVisible();
    await expect(locator).toHaveCount(0);
}
async function validateProductDeletedInDB(productName) {
    //DB check
    const delRows = await getProductByName(productName);
    expect(delRows.length).toBe(0);
}