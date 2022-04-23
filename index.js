import express from "express";
import path from "path";

const app = express();
const __dirname = path.resolve(path.dirname(''));
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

let pesquisa = [];

const pokedex = [
  {
    id: 1,
    nome: "Bulbasaur",
    tipo: "Tipo: Grass",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    descricao: "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
    altura: 70,
    peso: 6.9,
    categoria: "Seed",
    habilidade: "Overgrow",
  },
  {
    id: 2,
    nome: "Charmander",
    tipo: "Tipo: Fire",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
    descricao: "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
    altura: 60,
    peso: 8.5,
    categoria: "Lizard",
    habilidade: "Blaze",
  },
  {
    id: 3,
    nome: "Squirtle",
    tipo: "Tipo: Water",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
    descricao: "When it retracts its long neck into its shell, it squirts out water with vigorous force.",
    altura: 50,
    peso: 9,
    categoria: "Tiny Turtle",
    habilidade: "Torrent",
  },  
  {
    id: 4,
    nome: "Pichu",
    tipo: "Tipo: Eletric",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/172.png",
    descricao: "Despite its small size, it can zap even adult humans. However, if it does so, it also surprises itself.",
    altura: 30,
    peso: 2,
    categoria: "Tiny Mouse",
    habilidade: "Static",
  },
  {
    id: 5,
    nome: "Eevee",
    tipo: "Tipo: Normal",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png",
    descricao: "It has the ability to alter the composition of its body to suit its surrounding environment.",
    altura: 30,
    peso: 6.5,
    categoria: "Evolution",
    habilidade: "Run Away",
  }, 
]

app.get("/", (req, res) => {
  pesquisa = [];
  res.render("index", {pokedex, pesquisa});
});

app.get("/cadastro", (req, res) => {
  pesquisa = [];
  res.render("cadastro");
});

app.get("/:nome", (req, res) => {
  pesquisa = [];
  const nome = req.params.nome;
  const pokemon = pokedex.find(pokemon => pokemon.nome === nome);

  res.render("detalhe", {pokemon});

});

app.post("/add", (req, res) => {
  const pokemon = req.body;
  let index = false;

  for(let poke of pokedex){
    if(poke.nome.toLowerCase() === pokemon.nome.toLowerCase()){
      index = true;
      break;
    }
  }

  if(index === false) {
    pokemon.id = pokedex.length + 1;
    pokedex.push(pokemon);
  }

  res.redirect("/");
});

app.post("/search", (req, res) => {
  pesquisa = [];
  const search = req.body;
  let index = false;

  if(search.nome !== ""){
    for(let poke of pokedex) {
      if(poke.nome.toLowerCase().includes(search.nome.toLowerCase())){
        pesquisa.push(poke);
        index = true;
      }
    }
  } 

  if (index == false) {
    pesquisa = [];
  } 

  res.render("index", {pokedex, pesquisa});
});

app.listen(PORT, () => console.log(`Server in http://localhost:${PORT}`));