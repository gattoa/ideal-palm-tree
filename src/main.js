import './style.css'
import { getIcon } from './icons.js'

// In-memory store (no backend)
const todos = []

let nextId = 1

function addTodo(text) {
  const trimmed = text.trim()
  if (!trimmed) return
  todos.push({ id: nextId++, text: trimmed, completed: false })
}

function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id)
  if (todo) todo.completed = !todo.completed
}

function removeTodo(id) {
  const index = todos.findIndex((t) => t.id === id)
  if (index !== -1) todos.splice(index, 1)
}

function renderJourney() {
  const el = document.getElementById('todo-journey')
  if (!el) return
  const completed = todos.filter((t) => t.completed).length
  const inProgress = todos.length - completed
  el.textContent = `${completed} done · ${inProgress} in progress`
}

function renderTodos() {
  const list = document.querySelector('.todo-list')
  list.innerHTML = ''

  for (const todo of todos) {
    const li = document.createElement('li')
    li.className = 'todo-item' + (todo.completed ? ' todo-item--completed' : '')
    li.setAttribute('data-id', todo.id)

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.className = 'todo-item-checkbox'
    checkbox.checked = todo.completed
    checkbox.setAttribute('aria-label', todo.completed ? 'Mark incomplete' : 'Mark complete')
    checkbox.addEventListener('change', () => {
      toggleTodo(todo.id)
      renderTodos()
    })

    const span = document.createElement('span')
    span.className = 'todo-item-text'
    span.textContent = todo.text

    const deleteBtn = document.createElement('button')
    deleteBtn.type = 'button'
    deleteBtn.className = 'todo-item-delete'
    deleteBtn.setAttribute('aria-label', 'Delete todo')
    deleteBtn.appendChild(getIcon('trash', 'todo-item-delete-icon', 20))
    deleteBtn.addEventListener('click', () => {
      removeTodo(todo.id)
      renderTodos()
    })

    li.append(checkbox, span, deleteBtn)
    list.appendChild(li)
  }
  renderJourney()
}

const form = document.querySelector('.todo-form')
const input = document.querySelector('#todo-input')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  addTodo(input.value)
  input.value = ''
  renderTodos()
})

// Add icon to Add button
const addBtn = document.querySelector('.todo-add-button')
if (addBtn) addBtn.prepend(getIcon('plus', 'todo-add-icon', 20))

// Initial render (empty list)
renderJourney()
renderTodos()
