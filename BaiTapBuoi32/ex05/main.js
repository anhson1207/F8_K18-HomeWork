const main = document.querySelector("main");
const btn = document.getElementById("btn");
const input = document.getElementById("input");
const ul = document.getElementById("list");
btn.addEventListener("click", function () {
    const li = document.createElement("li");
    if (input.value) {
        li.textContent = input.value;
        ul.append(li);
    }
    input.value = "";
    input.focus();
});
ul.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("red");
    }
});