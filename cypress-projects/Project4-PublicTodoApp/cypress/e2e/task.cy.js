import Task from "../support/pages/Task";

const task = new Task();

describe('Task-CRUD', () => {

    let testData;
    before('Load Test Data', () => {
        cy.fixture('task').then((data) => {
            testData = data;

        })

    })

    beforeEach('setUp-Login and Add task', () => {
        cy.intercept('GET', '/fake/todo', {
            statusCode: 200,
            body: [
                { id: 1, title: 'Pay Electric Bill' },
                { id: 2, title: "Walk Dog" }
            ]
        }).as('fakeTodo');

        cy.visit('/').then((win) => {
            return win.fetch('/fake/todo');
        });

        cy.wait('@fakeTodo');
        testData.taskName.forEach((task) => {
            cy.addTodo(task);
        })
    })

    it('TC-1 Should update the status of added task', () => {
        task.getTaskNameLabel().each(($e1) => {
            const taskName = $e1.text();
            if (taskName === testData.taskName) {
                cy.wrap($e1).find(task.getViewCheckbox()).check();
                task.getCompletedLbl().should('be.visible');
                task.getClearCompleteLink().should('be.visible');
            }
        })

    })

    it('TC-2 Should delete the added task', () => {
        let totalLength;
        task.getTaskNameLabel().then(($view) => {
            totalLength = $view.length;
            cy.log(totalLength);
        })
        task.getTaskNameLabel().last()
            .find(task.getDeleteTaskBtn()).should('exist').invoke('show').click();

        task.getTaskNameLabel().then(($afterViewList) => {
            const finalLength = $afterViewList.length;
            cy.log(finalLength);
            expect(totalLength).is.not.eq(finalLength);
            expect(finalLength).to.eq(totalLength - 1);
        })


    })

    it('TC-3 should not add empty task', () => {
        let totalLength;
        task.getTaskNameLabel().then(($beforeViewList) => {
            totalLength = $beforeViewList.length;
            cy.log(totalLength);
        })
        task.getTaskTxtBox().type('{enter}');
        task.getTaskNameLabel().then(($afterViewList) => {
            let afterLength = $afterViewList.length;
            cy.log(afterLength);
            expect(totalLength).to.be.eq(afterLength);
        })

    })

})
