exports.todosPage = class todosPage {

    constructor(page) {
        this.page = page
        this.todo_text_box = page.getByPlaceholder('What needs to be done?')
        this.todo_title = page.getByTestId('todo-title')
        this.all_todos= page.getByRole('link', { name: 'All' })
        this.active_todos= page.getByRole('link', { name: 'Active' })
        this.completed_todos= page.getByRole('link', { name: 'Completed' })
        this.clearCompleted=page.getByRole('button', { name: 'Clear completed' })
        this.toggleAll=page.locator('label[for="toggle-all"]')
        this.clearCompletedList=page.getByRole('button', { name: 'Clear completed' })
        this.selectTodo=page.locator('//section[@class="main"]//li')
        this.editfirstTodo=page.locator('//section[@class="main"]//li').nth(1).getByRole('textbox', { name: 'Edit' })
        this.todoItem=page.getByTestId('todo-item')
        this.todoTotalCount=page.getByTestId('todo-count')
        this.checkbox=page.getByRole('checkbox', { name: 'Toggle Todo' })
    }

    async gotoTodoWebPage(){
        await this.page.goto('https://demo.playwright.dev/todomvc/');
    }

    // function to create new Todo on the page one by one
    async createNewTodo(todotext){
        const text=todotext.trim()
        await this.todo_text_box.clear();
        await this.todo_text_box.fill(text);
        await this.todo_text_box.press('Enter');
       // await page.screenshot({ path: 'screenshot.png', fullPage: true });
    }

    // function to navigate on All Todos
    async gotoAllTodo(){
        const visible = await this.all_todos.isVisible();
        if(visible)
        {
            await this.all_todos.click();
        }
    }

    // function to navigate on Activate Todos
    async gotoActiveTodo(){
        const visible = await this.active_todos.isVisible();
        if(visible)
        {
            await this.active_todos.click();
        }
    }

    // function to mark all activated todos as completed
    async markActiveTodoCompleted(){
        this.gotoActiveTodo()
        this.markAllTodoCompleted()
    }

    // function to navigate on Completed Todos
    async gotoCompletedTodo(){
        const visible = await this.completed_todos.isVisible();
        if(visible)
        {
            await this.completed_todos.click();
        }
    }

    // function to select all completed Todos
    async markAllTodoCompleted(){
        const visible = await this.toggleAll.isVisible();
        if(visible)
        {
            await this.toggleAll.click()
        }
    }

     // function to de-select all completed Todos
     async uncheckAllTodoCompleted(){
        const visible = await this.toggleAll.isVisible();
        if(visible)
        {
            await this.toggleAll.click()
        }
    }

    // function to clear completed Todos
    async clearCompletedTodo(){
        const visible = await this.clearCompletedList.isVisible();
        if(visible)
        {
            await this.clearCompletedList.click();
        }else{
            this.markAllTodoCompleted();
            await this.clearCompletedList.click();
        }
    }

    // Refresh Page
    async refreshPage(){
        await this.page.reload();
    }

    //function to select/de-select first todo
    async clickFirstTodo(){
       const firstTodo = this.selectTodo.nth(0)
        //await firstTodo.click()
       await firstTodo.getByRole('checkbox').uncheck(); 
 }

    // function to get all selected todos
    async verifyTodoCount(page,expected){
        const allTodoList= await this.selectTodo
        // console.log('########allTodos: ',await allTodoList.count())     
    }
}