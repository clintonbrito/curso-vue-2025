const todosApp = {
    data() {
        return {
            todos: [],
            newTodo: {
                done: false
            }
        }
    },
    methods: {
        addTodo: function() {
            if(this.newTodo.text) {
                this.todos.push(this.newTodo)
                this.newTodo = {
                    done: false
                }
                saveTodos();
            } else {
                alert('Você não pode inserir uma tarefa vazia')
            }
        },
        clearAll: function() {
            this.todos = []
            localStorage.removeItem("todos")
        },
        saveTodos: function() {
            localStorage.setItem("todos", JSON.stringify(this.todos));
        },
        toggleTodoDone: function(todo) {
            todo.done = !todo.done;
            this.saveTodos();
        }
    },
    created() {
        this.todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : this.todos;
    },
};

Vue.createApp(todosApp).mount('#app');
