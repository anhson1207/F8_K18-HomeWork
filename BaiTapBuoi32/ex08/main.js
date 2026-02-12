const main = document.querySelector("main");
const btn = document.getElementById("btn");
const input = document.getElementById("input");
const ul = document.getElementById("list");
btn.addEventListener("click", function () {
    if (input.value) {
        const li = document.createElement("li");
        li.textContent = input.value;
        ul.append(li);
    }

    input.value = "";
    input.focus();
});
ul.addEventListener("click", function (e) {
if(e.target.tagName==="LI"){
    const oldSelected = list.querySelector(".selected");
    if (oldSelected) oldSelected.classList.remove("selected");

    e.target.classList.add("selected");
}
});