const main=document.querySelector("main");
const btn=document.getElementById("btn");
const ul=document.getElementById("list");
let count=0;
btn.addEventListener("click",function(){
    count++;
    const li=document.createElement("li");
    li.textContent="Item "+count;
    ul.append(li);
})