import React from "react";
import styled from "@emotion/styled";
import { CssBaseline } from "@mui/material";
import PokemonInfo from "./components/PokemonInfo";
import PokemonFilter from "./components/PokemonFilter";
import PokemonTable from "./components/PokemonTable";
import "./App.css";

const Title = styled.h1`
  text-align: center;
`;
const PageContainer = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1em;
`;
const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  grid-column-gap: 1rem;
`;

function App() {
  const [filter, filterSet] = React.useState("");
  const [pokemon, pokemonSet] = React.useState(null);
  const [selectedPokemon, selectedPokemonSet] = React.useState(null);

  React.useEffect(() => {
    fetch("/starting-react/pokemon.json")
      .then((resp) => resp.json())
      .then((data) => pokemonSet(data));
  }, []);

  if (!pokemon) {
    return <div>Loading data</div>;
  }

  return (
    <PageContainer>
      <CssBaseline />
      <Title>Pokemon Search</Title>
      <TwoColumnLayout>
        <div>
          <PokemonFilter filter={filter} filterSet={filterSet}></PokemonFilter>
          <PokemonTable
            pokemon={pokemon}
            selectedPokemonSet={selectedPokemonSet}
            filter={filter}
          ></PokemonTable>
        </div>
        {selectedPokemon && <PokemonInfo {...selectedPokemon} />}
      </TwoColumnLayout>
    </PageContainer>
  );
}

export default App;
