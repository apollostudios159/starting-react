import React from "react";
import styled from "@emotion/styled";
import { CssBaseline } from "@mui/material";
import PokemonInfo from "./components/PokemonInfo";
import PokemonFilter from "./components/PokemonFilter";
import PokemonTable from "./components/PokemonTable";
import { Provider, useSelector, useDispatch } from "react-redux";
import "./App.css";
import { createStore } from "redux";

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

const stateReducer = (
  state = { pokemon: [], filter: "", selectedPokemon: null },
  { type, payload }
) => {
  switch (type) {
    case "SET_FILTER":
      return {
        ...state,
        filter: payload,
      };
    case "SET_POKEMON":
      return {
        ...state,
        pokemon: payload,
      };
    case "SET_SELECTED_POKEMON":
      return {
        ...state,
        selectedPokemon: payload,
      };
    default:
      return state;
  }
};
const store = createStore(stateReducer);

function App() {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon);
  React.useEffect(() => {
    fetch("/starting-react/pokemon.json")
      .then((resp) => resp.json())
      .then((data) => dispatch({ type: "SET_POKEMON", payload: data }));
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
          <PokemonFilter></PokemonFilter>
          <PokemonTable></PokemonTable>
        </div>
        <PokemonInfo />
      </TwoColumnLayout>
    </PageContainer>
  );
}

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
