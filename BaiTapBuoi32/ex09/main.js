const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");
function createTodoItem(value) {
    const li = document.createElement("li");
    li.classList.add("row");

    const text = document.createElement("span");
    text.textContent = value;

    const actionBtn = document.createElement("div");
    actionBtn.classList.add("gap");

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.classList.add("yellow");

    doneBtn.addEventListener("click", function () {
        doneBtn.classList.toggle("green");
        text.classList.toggle("text-done");
        renderSearch();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("red");

    deleteBtn.addEventListener("click", function () {
        li.remove();
        renderSearch();
    });

    actionBtn.append(doneBtn, deleteBtn);
    li.append(text, actionBtn);

    return li;
}
addBtn.addEventListener("click", function () {
    if (taskInput.value) {
        const newItem = createTodoItem(taskInput.value);
        list.append(newItem);
        renderSearch();
    }

    taskInput.value = "";
    taskInput.focus();
});

const searchInput = document.getElementById("searchInput");
const doneInput = document.getElementById("doneInput");
const searchList = document.getElementById("searchList");
function renderSearch() {
    const keyword = searchInput.value.toLowerCase();
    const onlyDone = doneInput.checked;
    const items = list.querySelectorAll("li");
    searchList.innerHTML = "";
    items.forEach(function (item) {
        const span = item.querySelector("span");
        const text = span.textContent;
        const isMatchText = text.toLowerCase().includes(keyword);
        const isDone = span.className.includes("text-done");
        if (isMatchText && (!onlyDone || isDone)) {
            const li = document.createElement("li");
            li.textContent = text;
            searchList.append(li);
        }
    });
}
searchInput.addEventListener("input", renderSearch);
doneInput.addEventListener("change", renderSearch);
