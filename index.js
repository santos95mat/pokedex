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
    altura: 0.7,
    peso: 6.9,
    categoria: "Seed",
    habilidade: "Overgrow",
  },
  {
    id: 2,
    nome: "Ivysaur",
    tipo: "Tipo: Grass",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png",
    descricao: "When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.",
    altura: 1.0,
    peso: 13,
    categoria: "Seed",
    habilidade: "Overgrow",
  },
  {
    id: 3,
    nome: "Venusaur",
    tipo: "Tipo: Grass",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png",
    descricao: "Its plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.",
    altura: 2,
    peso: 100,
    categoria: "Seed",
    habilidade: "Overgrow",
  },  
  {
    id: 4,
    nome: "Charmander",
    tipo: "Tipo: Fire",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
    descricao: "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
    altura: 0.6,
    peso: 8.5,
    categoria: "Lizard",
    habilidade: "Blaze",
  },
  {
    id: 5,
    nome: "Charmeleon",
    tipo: "Tipo: Fire",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png",
    descricao: "It has a barbaric nature. In battle, it whips its fiery tail around and slashes away with sharp claws.",
    altura: 1.1,
    peso: 19,
    categoria: "Flame",
    habilidade: "Blaze",
  },
  {
    id: 6,
    nome: "Charizard",
    tipo: "Tipo: Fire",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png",
    descricao: "It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames.",
    altura: 1.7,
    peso: 90.5,
    categoria: "Flame",
    habilidade: "Blaze",
  },
  {
    id: 7,
    nome: "Squirtle",
    tipo: "Tipo: Water",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
    descricao: "When it retracts its long neck into its shell, it squirts out water with vigorous force.",
    altura: 0.5,
    peso: 9,
    categoria: "Tiny Turtle",
    habilidade: "Torrent",
  },
  {
    id: 8,
    nome: "Wartortle",
    tipo: "Tipo: Water",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/008.png",
    descricao: "It is recognized as a symbol of longevity. If its shell has algae on it, that Wartortle is very old.",
    altura: 1,
    peso: 22.5,
    categoria: "Turtle",
    habilidade: "Torrent",
  },  
  {
    id: 9,
    nome: "Blastoise",
    tipo: "Tipo: Water",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png",
    descricao: "It crushes its foe under its heavy body to cause fainting. In a pinch, it will withdraw inside its shell.",
    altura: 1.6,
    peso: 85.5,
    categoria: "Shellfish",
    habilidade: "Torrent",
  },
  {
    id: 10,
    nome: "Pichu",
    tipo: "Tipo: Eletric",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/172.png",
    descricao: "Despite its small size, it can zap even adult humans. However, if it does so, it also surprises itself.",
    altura: 0.3,
    peso: 2,
    categoria: "Tiny Mouse",
    habilidade: "Static",
  },
  {
    id: 11,
    nome: "Pikachu",
    tipo: "Tipo: Eletric",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
    descricao: "Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.",
    altura: 0.4,
    peso: 6,
    categoria: "Mouse",
    habilidade: "Static",
  },
  {
    id: 12,
    nome: "Raichu",
    tipo: "Tipo: Eletric",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/026.png",
    descricao: "Its long tail serves as a ground to protect itself from its own high-voltage power.",
    altura: 0.8,
    peso: 30,
    categoria: "Mouse",
    habilidade: "Static",
  },
  {
    id: 13,
    nome: "Mew",
    tipo: "Tipo: Psychic",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/151.png",
    descricao: "When viewed through a microscope, this Pokémon’s short, fine, delicate hair can be seen.",
    altura: 0.4,
    peso: 4,
    categoria: "New Species",
    habilidade: "Synchronize",
  },
  {
    id: 14,
    nome: "Mewtwo",
    tipo: "Tipo: Psychic",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png",
    descricao: "Its DNA is almost the same as Mew’s. However, its size and disposition are vastly different.",
    altura: 2,
    peso: 122,
    categoria: "Genetic",
    habilidade: "Pressure",
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