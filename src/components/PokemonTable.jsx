import React, { useContext } from "react";
import PokemonRow from "./PokemonRow";
import { useSelector, useDispatch } from "react-redux";

function PokemonTable() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const pokemon = useSelector((state) => state.pokemon);

  return (
    <table width="100%">
      <tbody>
        {pokemon
          .filter(({ name: { english } }) =>
            english.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
          )
          .slice(0, 20)
          .map((pokemon) => (
            <PokemonRow
              key={pokemon.name.english}
              pokemon={pokemon}
              onClick={(pokemon) =>
                dispatch({
                  type: "SET_SELECTED_POKEMON",
                  payload: pokemon,
                })
              }
            />
          ))}
      </tbody>
    </table>
  );
}

export default PokemonTable;
