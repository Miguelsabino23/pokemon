import { NavLink } from "react-router";
import LogoPokemon from "./logoPokemon";

export function Header() {
  return (
    <header className='w-full items-center bg-third border-b-0 drop-shadow-md'>
      <div className='flex items-center py-4 px-40 justify-between w-full'>
        <NavLink to='/'>
          <LogoPokemon />
        </NavLink>
        <nav className='flex justify-between w-1/3 '>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `no-underline text-dark border-b-2 text-2xl  transition-all ${
                isActive ? "border-dark" : "border-transparent"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to='pokedex'
            className={({ isActive }) =>
              `no-underline text-dark border-b-2 text-2xl  transition-all ${
                isActive ? "border-dark" : "border-transparent"
              }`
            }
          >
            Pokédex
          </NavLink>
          <NavLink
            to='legendaries'
            className={({ isActive }) =>
              `no-underline text-dark border-b-2 text-2xl  transition-all ${
                isActive ? "border-dark" : "border-transparent"
              }`
            }
          >
            Legendaries
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
