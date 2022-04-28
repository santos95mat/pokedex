const nav = document.querySelector("#mobileImg");
const ul = document.querySelector("#mobileUl");

let i = 0;

let nomes = [];

if(document.querySelector(".formulario")){
    for(poke of pokedex){
        nomes.push(poke.nome);
    }    
}

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

class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    }
  
    eventos() {
        this.formulario.addEventListener('submit', e => {
        this.handleSubmit(e);
      });
    }
  
    handleSubmit(e) {
        e.preventDefault();
        const valido = this.pokemonValido();

        if(valido === true) {
            this.formulario.submit();
        }
    }

    pokemonValido() {
        const pokemon = this.formulario.querySelector("#nome");
        const imagem = this.formulario.querySelector("#imagem").value.trim();
        console.log(imagem);
        const pokeNome = pokemon.value.trim();
        const text = pokeNome + " ja cadastrado";
        let cadastrado = false;

        for(let nome of nomes) {
            if(nome.toLowerCase() === pokeNome.toLowerCase()){
                pokemon.value = "";
                pokemon.placeholder = text;
                pokemon.style.animation = "mv .3s linear 1 backwards";
                pokemon.addEventListener("webkitAnimationEnd", () => pokemon.style.animation = null);
                pokemon.addEventListener("animationend", () => pokemon.style.animation = null);
                cadastrado = true;
                break;
            }
        }

        if(cadastrado === false) {
            const absolut = document.querySelector("#absolute")
            const h2 = document.querySelector("#h2");
            const img = document.querySelector("#img")

            absolut.style.display = "block";
            absolut.style.overflow = "hidden";
            h2.innerText = pokeNome + " cadastrado com sucesso";
            img.src = imagem;
            return true;
        }

        return false
    }
}
  
if(document.querySelector(".formulario")){
    const valida = new ValidaFormulario();
}