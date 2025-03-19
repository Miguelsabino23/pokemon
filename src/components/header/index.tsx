import { Link, NavLink } from "react-router";
import logo from "../../assets/svg/logo.svg";

export function Header() {
  return (
    <header className='w-full flex items-center justify-around'>
      <img src={logo} alt='logo-pokemon' />
      <nav className='flex justify-around w-1/3 '>
        <NavLink to='/' className='no-underline text-black'>
          Home
        </NavLink>
        <Link to='pokedex' className='no-underline text-black'>
          Pokédex
        </Link>
        <Link to='legendaries' className='no-underline'>
          Legendaries
        </Link>
      </nav>
    </header>
  );
}
