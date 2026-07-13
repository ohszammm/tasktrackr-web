const API_URL = "api/tasks.php";


async function loadTasks() {
  const res = await fetch(`${API_URL}?action=list`);
  const tasks = await res.json();
  renderTasks(tasks);
}


function renderTask(task) {
  return `<li class="task-item" data-id="${task.id}">
    <span>${task.title}</span>
  </li>`;
}


function renderTasks(tasks) {
  const list = document.getElementById("task-list");
  list.innerHTML = tasks.map(renderTask).join('');
}


function renderTask(task) {
  const overdue = task.due_date && new Date(task.due_date) < new Date()
    && task.status !== "done";
  return `<li class="task-item ${overdue ? 'overdue' : ''}" data-id="${task.id}">
    <span>${task.title}</span>
    <span class="due-date">${task.due_date ? "Due " + task.due_date : ""}</span>
  </li>`;
}


const due_date = document.getElementById("due_date").value;
body: JSON.stringify({ title, due_date }),




document.getElementById("task-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  await fetch(`${API_URL}?action=add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
});
  document.getElementById("title").value = "";
  loadTasks();
});


loadTasks();
