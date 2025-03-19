import { Route, Routes } from "react-router";
import { Layout } from "./layout";
import { Home } from "./pages/home";
import { Pokedex } from "./pages/pokedex";
import { Legendaries } from "./components/legendaries";

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='pokedex' element={<Pokedex />} />
        <Route path='legendaries' element={<Legendaries />} />
      </Route>
    </Routes>
  );
}
