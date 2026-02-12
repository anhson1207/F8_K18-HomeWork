const btn=document.getElementById("btn");
const main=document.querySelector("main");
btn.addEventListener("click",function(){
    const p=document.createElement("p");
    p.textContent="Hello DOM";
    main.append(p);
})