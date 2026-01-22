class Task {
    getTaskTxtBox() {
        return cy.get('[data-test="new-todo"]');
    }
    getTaskNameLabel() {
        return cy.get('.view');
    }
    getViewCheckbox() {
        return "[type='checkbox']";
    }
    getCompletedLbl() {
        return cy.get('.completed');
    }
    getClearCompleteLink() {
        return cy.get('.clear-completed');
    }
    getDeleteTaskBtn() {
        return '.destroy';
    }
}
export default Task;