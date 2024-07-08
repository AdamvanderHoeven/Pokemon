import React, { useEffect, useState } from "react";
import Pokemon from "./Pokemon";
import { Link } from "react-router-dom";

const fetchPokemon = async () => {
  const pokemonData = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  const pokemons = await pokemonData.json();
  console.log({ pokemons });
  return pokemons.results;
};

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetchPokemon()
      .then((data) => {
        setStatus("complete");
        setPokemons(data);
      })
      .catch((error) => {
        console.log(error);
        setStatus("error");
      });
  }, []);

  if (status === "loading") {
    return <div>Loading....</div>;
  } else if (status === "error") {
    return "error fetching data";
  } else {
    return (
      <div className="pokemonCards">
        {pokemons.map((pokemon) => (
          <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name}>
            <Pokemon name={pokemon.name} />
          </Link>
        ))}
      </div>
    );
  }
};

export default Pokemons;


export default PokemonDetails;

const fetchPokemon = async () => {
  const pokemonData = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  const pokemons = await pokemonData.json();
  console.log({ pokemons });
  return pokemons.results;
};
