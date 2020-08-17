import React, { useState, useEffect } from "react";
import { getPokemons, getPokemon } from "../utils/api";
import MaterialTable from "material-table";

const Main = () => {
  const [pokemons, setPokemons] = useState([]);

  const GET_POKEMONS = async () => {
    const { status, data } = await getPokemons(20);
    if (status === 200) {
      const { results } = data;
      const pokemonDetails = await Promise.all(
        results.map(async (el) => {
          const { data: pokemon } = await getPokemon(el.url);

          const pokemonData = {
            baseExperience: pokemon.base_experience,
            img: pokemon.sprites.other["official-artwork"].front_default,
            name: pokemon.species.name,
          };
          return pokemonData;
        })
      );
      console.log(pokemonDetails)
      setPokemons(pokemonDetails);
    }
  };

  useEffect(() => {
    GET_POKEMONS();
  }, []);

  // Name, photo, base exp
  const columns = [
    { title: "Name", field: "name" },
    {
      title: "Photo",
      field: "img",
      render: (rowData) => (
        <img src={rowData.img} style={{ width: 50, borderRadius: "50%" }} />
      ),
    },
    { title: "Base Experience", field: "baseExperience" },
  ];

  return (
    <>
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable columns={columns} data={pokemons} title={"Pokemon"}/>
      </div>
    </>
  );
};

export default Main;
