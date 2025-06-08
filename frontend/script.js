const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Auto-detecta si estamos en desarrollo o producción
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";
const API_URL = isLocalhost
  ? "http://localhost:3000/api/tasks"
  : `${window.location.origin}/api/tasks`;

// Cargar tareas al iniciar
document.addEventListener("DOMContentLoaded", loadTasks);

// Agregar tarea
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText !== "") {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: taskText }),
      });
      const newTask = await res.json();
      console.log(newTask);
      addTaskToDOM(newTask);
      input.value = "";
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  }
});

// Cargar todas las tareas
async function loadTasks() {
  try {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    taskList.innerHTML = "";
    tasks.forEach(addTaskToDOM);
  } catch (error) {
    console.error("Error al cargar tareas:", error);
  }
}

// Renderizar tarea
function addTaskToDOM(task) {
  const div = document.createElement("div");
  div.classList.add("task");
  if (task.done) div.classList.add("done");

  div.setAttribute("data-id", task.id);

  div.innerHTML = `
    <span>${task.text}</span>
    <div>
      <button class="btn btn-success btn-sm me-1" onclick="toggleDone(this)">✓</button>
      <button class="btn btn-danger btn-sm" onclick="deleteTask(this)">🗑️</button>
    </div>
  `;

  taskList.appendChild(div);
}

// Marcar como hecha / deshecha
async function toggleDone(btn) {
  const taskDiv = btn.closest(".task");
  const taskId = taskDiv.getAttribute("data-id");
  const isDone = taskDiv.classList.contains("done");

  try {
    await fetch(`${API_URL}/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !isDone }),
    });

    taskDiv.classList.toggle("done");
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
  }
}

// Eliminar tarea
async function deleteTask(btn) {
  const taskDiv = btn.closest(".task");
  const taskId = taskDiv.getAttribute("data-id");

  try {
    await fetch(`${API_URL}/${taskId}`, {
      method: "DELETE",
    });

    taskDiv.remove();
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
  }
}
