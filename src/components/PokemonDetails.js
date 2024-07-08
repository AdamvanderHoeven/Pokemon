import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css";

const fetchPokemonDetails = async (name) => {
  const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemons = await pokemonData.json();
  return pokemons;
};

const fetchPokemonEvolution = async (id) => {
  const pokemonEvolutionData = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  );
  const pokemonEvolution = await pokemonEvolutionData.json();
  return pokemonEvolution;
};

const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonEvoData, setPokemonEvoData] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetchPokemonDetails(name)
      .then((data) => {
        setPokemonData(data);
      })
      .catch((error) => {
        console.log(error);
        setStatus("error");
      });
  }, [name]);

  useEffect(() => {
    if (pokemonData != null) {
      fetchPokemonEvolution(pokemonData.id)
        .then((data) => {
          setPokemonEvoData(data);
          setStatus("complete");
        })
        .catch((error) => {
          console.log(error);
          setStatus("error");
        });
    }
  }, [pokemonData]);

  console.log(pokemonEvoData);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  console.log(pokemonEvoData);

  if (status === "loading") {
    return <div>Loading....</div>;
  } else if (status === "error") {
    return "error fetching data";
  } else {
    return (
      <div className="pokemonDetails">
        <h3>{capitalizeFirstLetter(pokemonData.name)}</h3>
        <h5>Pokemon ID : {pokemonData.id}</h5>
        <h5>Pokemon Height : {pokemonData.height}</h5>
        <h5>Weight : {pokemonData.weight}</h5>
        {pokemonEvoData?.evolves_from_species?.name && (
          <p>Evolves from {pokemonEvoData.evolves_from_species.name}</p>
        )}
        <div className="pokemonImages">
          <img
            src={pokemonData.sprites.front_default}
            alt="Front view of default sprite"
          />
          <img
            src={pokemonData.sprites.back_default}
            alt="Back view of default sprite"
          />
          <img
            src={pokemonData.sprites.front_shiny}
            alt="Front view of shiny sprite"
          />
          <img
            src={pokemonData.sprites.back_shiny}
            alt="Back view of shiny sprite"
          />
        </div>
      </div>
    );
  }
};

export default PokemonDetails;
