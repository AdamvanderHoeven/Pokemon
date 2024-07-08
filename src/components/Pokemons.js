import React, { useEffect, useState } from "react";
import Pokemon from "./Pokemon";
import { Link, useSearchParams } from "react-router-dom";

const fetchPokemon = async (offset, limit) => {
  const pokemonData = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const pokemons = await pokemonData.json();
  console.log({ pokemons });
  return pokemons.results;
};

const Pokemons = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pokemons, setPokemons] = useState([]);
  const [status, setStatus] = useState("loading");
  // const [offset, setOffset] = useState(searchParams.get("offset"));
  const [page, setPage] = useState(1);
  const limit = parseInt(searchParams.get("limit")) || 20;
  const offset = parseInt(searchParams.get("offset")) || 0;

  useEffect(() => {
    fetchPokemon(offset, limit)
      .then((data) => {
        setStatus("complete");
        setPokemons(data);
      })
      .catch((error) => {
        console.log(error);
        setStatus("error");
      });
  }, [offset]);

  const handleNext = () => {
    setSearchParams({ limit, offset: offset + limit });
    setPage(page + 1);
  };

  const handlePrevious = () => {
    if (offset > 0) {
      setSearchParams({ limit, offset: offset - limit });
      setPage(page - 1);
    }
  };
  const handlePageClick = (pageNumber) => {
    setSearchParams({ limit, offset: (pageNumber - 1) * limit });
    setPage(pageNumber);
  };

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
        <div className="buttonContainer">
          <button
            onClick={handlePrevious}
            className="buttonPage"
            disabled={offset === 0}
          >
            Previous
          </button>
          {page - 2 > 0 && (
            <button
              onClick={() => handlePageClick(page - 2)}
              className="buttonPageNo"
            >
              {page - 2}
            </button>
          )}
          {page - 1 > 0 && (
            <button
              onClick={() => handlePageClick(page - 1)}
              className="buttonPageNo"
            >
              {page - 1}
            </button>
          )}
          <button
            onClick={() => handlePageClick(page)}
            className="buttonPageNoCurrent"
          >
            {page}
          </button>
          <button
            onClick={() => handlePageClick(page + 1)}
            className="buttonPageNo"
          >
            {page + 1}
          </button>
          <button
            onClick={() => handlePageClick(page + 2)}
            className="buttonPageNo"
          >
            {page + 2}
          </button>
          <button onClick={handleNext} className="buttonPage">
            Next
          </button>
        </div>
      </div>
    );
  }
};

export default Pokemons;
