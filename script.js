// 'use strict'

document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todo-text')
  const addTodoBtn = document.getElementById('add-todo')
  const todoList = document.getElementById('todo-list')

  let todos = JSON.parse(localStorage.getItem('todos')) || []

  function renderTodos() {
    todoList.innerHTML = '' // Clear existing list
    todos.forEach((todo, index) => {
      const li = document.createElement('li')
      li.appendChild(document.createTextNode(todo.text))

      // Create a checkbox for marking tasks as complete
      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      checkbox. checked = todo.completed // Check if the task is completed

      // Event Listener for checkbox toggle
      checkbox.addEventListener('change', () => toggleCompleted(index))

      // Add the tast text and checkbox to the list item
      li.appendChild(checkbox)
      // li.appendChild(document.createTextNode(todo.text))

      const deleteBtn = document.createElement('button')
      deleteBtn.textContent = 'Delete'
      deleteBtn.addEventListener('click', () => deleteTodo(index))

      li.appendChild(deleteBtn)
      todoList.appendChild(li)
    })
  }

  function addTodo() {
    const newTodo = todoInput.value.trim()
    if (newTodo) {
      const todoObject = {
        text: newTodo,
        completed: false // Set new task as not completed
      }


      todos.push(todoObject)
      localStorage.setItem('todos', JSON.stringify(todos))
      todoInput.value = ''
      renderTodos()
    }
  }

  function deleteTodo(index) {
    todos.splice(index, 1)
    localStorage.setItem('todos', JSON.stringify(todos))
    renderTodos()
  }

  function toggleCompleted() {
    todos[index].completed = !todos[index].completed // Toggle completion
    localStorage.setItem('todos', JSON.stringify(todos)) // Update local storage
    renderTodos()
  }

  addTodoBtn.addEventListener('click', addTodo)
  renderTodos()

})