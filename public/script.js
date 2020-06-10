const btnHeader = document.querySelector("header button");
const form = document.querySelector(".form");

//togle funciona como um interruptor

btnHeader.addEventListener("click", function(){
    form.classList.toggle('hide')
})