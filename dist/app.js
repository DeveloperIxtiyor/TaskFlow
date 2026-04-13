var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var tasks = [];
var filter = "all";
var titleInput = document.getElementById("title");
var descInput = document.getElementById("desc");
var addBtn = document.getElementById("addBtn");
var tasksDiv = document.getElementById("tasks");
var API = 'https://helminthoid-clumsily-xuan.ngrok-free.dev';
var SKIP_NGROK = {
    'ngrok-skip-browser-warning': 'true',
};
// async function loadUser(): Promise<void> {
//   const res = await fetch(`${API}/user`/me, {headers: authHeader()})
// }
function authHeader() {
    var token = getToken();
    return __assign({ 'Authorization': "Bearer ".concat(getToken) }, SKIP_NGROK);
}
var days;
function getToken() {
    return localStorage.getItem('token') || '';
}
if (!getToken()) {
    window.location.href = './index.html';
}
function saveToStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadFromStorage() {
    var data = localStorage.getItem("tasks");
    if (data) {
        tasks = JSON.parse(data);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    loadFromStorage();
    render();
});
addBtn.addEventListener("click", function () {
    if (!titleInput.value)
        return;
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
    var filtered = tasks;
    if (filter === "done")
        filtered = tasks.filter(function (t) { return t.done; });
    if (filter === "pending")
        filtered = tasks.filter(function (t) { return !t.done; });
    filtered.forEach(function (task) {
        var div = document.createElement("div");
        div.className =
            "p-4 rounded-xl flex justify-between items-center gradient-border";
        div.innerHTML = "\n      <div>\n        <h3 class=\"".concat(task.done ? "line-through text-slate-500" : "", "\">\n          ").concat(task.title, "\n        </h3>\n        <p class=\"text-slate-400 text-sm\">").concat(task.desc, "</p>\n      </div>\n\n      <div class=\"flex gap-2\">\n        <button onclick=\"toggleTask(").concat(task.id, ")\">\u2714</button>\n        <button onclick=\"deleteTask(").concat(task.id, ")\">\u274C</button>\n      </div>\n    ");
        tasksDiv.appendChild(div);
    });
    updateStats();
}
window.toggleTask = function (id) {
    tasks = tasks.map(function (t) {
        return t.id === id ? __assign(__assign({}, t), { done: !t.done }) : t;
    });
    saveToStorage();
    render();
};
window.deleteTask = function (id) {
    tasks = tasks.filter(function (t) { return t.id !== id; });
    saveToStorage();
    render();
};
document.getElementById("allBtn").onclick = function () {
    filter = "all";
    render();
};
document.getElementById("doneBtn").onclick = function () {
    filter = "done";
    render();
};
document.getElementById("pendingBtn").onclick = function () {
    filter = "pending";
    render();
};
function updateStats() {
    var total = tasks.length;
    var done = tasks.filter(function (t) { return t.done; }).length;
    var left = total - done;
    var totalEl = document.getElementById("total");
    var doneEl = document.getElementById("done");
    var leftEl = document.getElementById("left");
    var allCount = document.getElementById("allCount");
    var doneCount = document.getElementById("doneCount");
    var pendingCount = document.getElementById("pendingCount");
    if (totalEl)
        totalEl.textContent = total.toString();
    if (doneEl)
        doneEl.textContent = done.toString();
    if (leftEl)
        leftEl.textContent = left.toString();
    if (allCount)
        allCount.textContent = total.toString();
    if (doneCount)
        doneCount.textContent = done.toString();
    if (pendingCount)
        pendingCount.textContent = left.toString();
}
