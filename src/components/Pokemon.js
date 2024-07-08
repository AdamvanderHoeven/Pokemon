import React, { useEffect, useState } from "react";

const fetchPokemon = async (name) => {
  const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon = await pokemonData.json();
  console.log({ pokemon });
  return pokemon;
};

const Pokemon = ({ name }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetchPokemon(name)
      .then((data) => {
        setStatus("complete");
        setPokemonData(data);
      })
      .catch((error) => {
        console.log(error);
        setStatus("error");
      });
  }, [name]);

  const capitalizeFirstLetter = (string) => {
    if (string) {
      console.log(string);
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  };

  if (status === "loading") {
    return <div>Loading....</div>;
  } else if (status === "error") {
    return "error fetching data";
  } else {
    return (
      <div className="pokemonData">
        <button className="button">
          <div>
            <h4>Pokemon ID : {pokemonData.id}</h4>
            <h3>{capitalizeFirstLetter(pokemonData.name)}</h3>
            <img src={pokemonData.sprites.front_default} />
          </div>
        </button>
      </div>
    );
  }
};

export default Pokemon;
