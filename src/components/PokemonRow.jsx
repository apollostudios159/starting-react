import React from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import PokemonType from "../PokemonType";

const PokemonRow = ({ pokemon, onClick }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onClick(pokemon)}
      >
        More Information
      </Button>
    </td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.arrayOf(PokemonType),
};

export default PokemonRow;
