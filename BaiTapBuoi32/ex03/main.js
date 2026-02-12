const main=document.querySelector("main");
const btn=document.getElementById("btn");
const input=document.getElementById("input");
btn.addEventListener("click",function(){
    const p=document.createElement("p");
    p.textContent=input.value;
    main.append(p);
    input.value="";
    input.focus();
})
