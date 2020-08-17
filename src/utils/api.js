import axios from "axios";

const getPokemons = (count) => {
  // const url = `https://pokeapi.co/api/v2/pokemon/${count}`;
  const url = `https://pokeapi.co/api/v2/pokemon`;
  
  const res = axios({
    method: 'get',
    url: url,
    params: {
      limit: count
    }
  });
  return res;
};

const getPokemon = (url) => {
  const res = axios({
    method: 'get',
    url: url
  });
  return res;
};

export {
  getPokemons,
  getPokemon
}