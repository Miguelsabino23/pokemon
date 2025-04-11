import { Route, Routes } from "react-router";
import { Layout } from "./layout";
import { Home } from "./pages/home";
import { Pokedex } from "./pages/pokedex";
import { Legendaries } from "./pages/legendaries";
import { SearchPokemonProvider } from "./contextProvider/searchPokemonProvider";
import { NextPageProvider } from "./contextProvider/nextPagePokesProvider";

export function App() {
  return (
    <SearchPokemonProvider>
      <NextPageProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='pokedex' element={<Pokedex />} />
            <Route path='legendaries' element={<Legendaries />} />
          </Route>
        </Routes>
      </NextPageProvider>
    </SearchPokemonProvider>
  );
}
