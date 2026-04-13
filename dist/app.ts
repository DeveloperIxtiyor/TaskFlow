type Task = {
  id: number;
  title: string;
  desc: string;
  done: boolean;
};

let tasks: Task[] = [];
let filter: "all" | "done" | "pending" = "all";

const titleInput = document.getElementById("title") as HTMLInputElement;
const descInput = document.getElementById("desc") as HTMLInputElement;
const addBtn = document.getElementById("addBtn")!;
const tasksDiv = document.getElementById("tasks")!;

const API: string = 'https://helminthoid-clumsily-xuan.ngrok-free.dev'

const SKIP_NGROK: Record<string, string> = {
  'ngrok-skip-browser-warning': 'true',
}

// async function loadUser(): Promise<void> {
//   const res = await fetch(`${API}/user`/me, {headers: authHeader()})
// }

function authHeader(): Record<string, string> {
  const token = getToken();
  return {
    'Authorization': `Bearer ${getToken}`,
    ...SKIP_NGROK,
  };
}

const days = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba']

const moths = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"];


function getToken(): string {
  return localStorage.getItem('token') || ''
}

if (!getToken()) {
  window.location.href = './index.html'
}



function saveToStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadFromStorage() {
  const data = localStorage.getItem("tasks");
  if (data) {
    tasks = JSON.parse(data);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  loadFromStorage();
  render();
});


addBtn.addEventListener("click", () => {
  if (!titleInput.value) return;

  tasks.push({
    id: Date.now(),
    title: titleInput.value,
    desc: descInput.value,
    done: false
  });

  titleInput.value = "";
  descInput.value = "";

  saveToStorage();
  render();
});


function render() {
  tasksDiv.innerHTML = "";

  let filtered = tasks;

  if (filter === "done") filtered = tasks.filter(t => t.done);
  if (filter === "pending") filtered = tasks.filter(t => !t.done);

  filtered.forEach(task => {
    const div = document.createElement("div");

    div.className =
      "p-4 rounded-xl flex justify-between items-center gradient-border";

    div.innerHTML = `
      <div>
        <h3 class="${task.done ? "line-through text-slate-500" : ""}">
          ${task.title}
        </h3>
        <p class="text-slate-400 text-sm">${task.desc}</p>
      </div>

      <div class="flex gap-2">
        <button onclick="toggleTask(${task.id})">✔</button>
        <button onclick="deleteTask(${task.id})">❌</button>
      </div>
    `;

    tasksDiv.appendChild(div);
  });

  updateStats();
}


(window as any).toggleTask = (id: number) => {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, done: !t.done } : t
  );
  saveToStorage();
  render();
};

(window as any).deleteTask = (id: number) => {
  tasks = tasks.filter(t => t.id !== id);
  saveToStorage();
  render();
};


document.getElementById("allBtn")!.onclick = () => {
  filter = "all";
  render();
};

document.getElementById("doneBtn")!.onclick = () => {
  filter = "done";
  render();
};

document.getElementById("pendingBtn")!.onclick = () => {
  filter = "pending";
  render();
};


function updateStats() {
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const left = total - done;

  const totalEl = document.getElementById("total");
  const doneEl = document.getElementById("done");
  const leftEl = document.getElementById("left");

  const allCount = document.getElementById("allCount");
  const doneCount = document.getElementById("doneCount");
  const pendingCount = document.getElementById("pendingCount");

  if (totalEl) totalEl.textContent = total.toString();
  if (doneEl) doneEl.textContent = done.toString();
  if (leftEl) leftEl.textContent = left.toString();

  if (allCount) allCount.textContent = total.toString();
  if (doneCount) doneCount.textContent = done.toString();
  if (pendingCount) pendingCount.textContent = left.toString();
}