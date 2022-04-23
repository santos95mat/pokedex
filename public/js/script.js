const nav = document.querySelector("#mobileImg");
const ul = document.querySelector("#mobileUl");

let i = 0;

nav.addEventListener("click", function(){   
    if(i%2 == 0){
        ul.style.display = "block";
        i = 1;
    }
    else {
        ul.style.display = "none";
        i = 0;
    }
});