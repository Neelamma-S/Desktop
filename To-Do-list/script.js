const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage if any
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    const span = document.createElement('span');
    span.textContent = task.text;
    span.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Add new task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTaskText = taskInput.value.trim();
  if (newTaskText !== '') {
    tasks.push({ text: newTaskText, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = '';
    taskInput.focus();
  }
});

// Initial render
renderTasks();
