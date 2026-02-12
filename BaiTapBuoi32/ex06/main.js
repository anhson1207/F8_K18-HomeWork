const main = document.querySelector("main");
const btn = document.getElementById("btn");
const input = document.getElementById("input");
const ul = document.getElementById("list");
btn.addEventListener("click", function () {
    if (input.value) {
        const li = document.createElement("li");

        const text = document.createElement("span");
        text.textContent = input.value;

        const close = document.createElement("span");
        close.textContent = "X";
        close.classList.add("close-btn");

        li.append(text, close);
        ul.append(li);
    }

    input.value = "";
    input.focus();
});
ul.addEventListener("click",function(e){
    if(e.target.classList.contains("close-btn")){
        e.target.parentElement.remove();
    }
})

