import express from "express";
import path from "path";

const app = express();
const __dirname = path.resolve(path.dirname(''));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const pokedex = [
  {
    id: 1,
    nome: "Bulbasaur",
    descricao: "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
    tipo: "Tipo: Grass",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
  },
  {
    id: 2,
    nome: "Charmander",
    descricao: "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
    tipo: "Tipo: Fire",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png"
  },
  {
    id: 3,
    nome: "Squirtle",
    descricao: "When it retracts its long neck into its shell, it squirts out water with vigorous force.",
    tipo: "Tipo: Water",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png"
  },  
  {
    id: 4,
    nome: "Pikachu",
    descricao: "Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.",
    tipo: "Tipo: Electric",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
  },   
]

app.get("/", (req, res) => {
  res.render("index", {pokedex});
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

app.get("/:nome", (req, res) => {
  const nome = req.params.nome;
  const pokemon = pokedex.find(pokemon => pokemon.nome === nome);

  res.render("detalhe", {pokemon});
});

app.post("/add", (req, res) => {
  const pokemon = req.body;

  pokedex.push(pokemon);

  res.redirect("/");
});

app.listen(3000);
