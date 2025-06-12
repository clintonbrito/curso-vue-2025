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
            } else {
                alert('Você não pode inserir uma tarefa vazia')
            }
        },
        clearAll: function() {
            this.todos = []
        }
    }
};

Vue.createApp(todosApp).mount('#app');
