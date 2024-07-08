import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css";

const fetchPokemonList = async (name) => {
  const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemons = await pokemonData.json();
  console.log({ pokemons });
  return pokemons;
};

const fetchPokemonEvolution = async (name) => {
  const pokemonEvolutionData = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );
  const pokemonEvolution = await pokemonData.json();
  console.log({ pokemonEvolution });
  return pokemonEvolution;
};

const PokemonDetails = () => {
  const { id } = useParams();
  const { name } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonEvoData, setPokemonEvoData] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetchPokemonList(name)
      .then((data) => {
        setStatus("complete");
        setPokemonData(data);
      })
      .catch((error) => {
        console.log(error);
        setStatus("error");
      });
  }, [name]);

  useEffect(() => {
    fetchPokemonEvolution(id)
      .then((data) => {
        setStatus("complete");
        setsetPokemonEvoData(id);
      })
      .catch((error) => {
        console.log(error);
        setStatus("error");
      });
  }, [name]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

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
        <div className="pokemonImages">
          <img src={pokemonData.sprites.front_default} />
          <img src={pokemonData.sprites.back_default} />
          <img src={pokemonData.sprites.front_shiny} />
          <img src={pokemonData.sprites.back_shiny} />
        </div>
      </div>
    );
  }
};

export default PokemonDetails;


<div className="buttonContainer">
          <button
            onClick={handlePrevious}
            className="buttonPage"
            disabled={offset === 0}
          >
            Previous
          </button>
          {page - 2 > 0 && <button className="buttonPageNo">{page - 2}</button>}
          {page > 0 && <button className="buttonPageNo">{page - 1}</button>}
          <button className="buttonPageNo">{page}</button>
          <button className="buttonPageNo">{page + 1}</button>
          <button className="buttonPageNo">{page + 2}</button>
          <button onClick={handleNext} className="buttonPage">
            Next
          </button>
        </div>
      </div>