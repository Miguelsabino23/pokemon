import { NavLink } from "react-router";
import bannerPicachu from "../../assets/images/pikachu.png";

export function Home() {
  return (
    <section className='w-full bg-gradient-to-r from-third to-primary  pl-40 flex justify-between h-screen '>
      <div className='flex flex-col gap-16 w-[516px] mt-40'>
        <h1 className='text-6xl text-[#000] '>
          <span className='font-black'>Find</span> all your favorite{" "}
          <span className='font-black'>Pokemon</span>
        </h1>
        <h2 className='text-2xl'>
          You can know the type of Pokemon, its strengths, disadvantages and
          abilities
        </h2>
        <div>
          <button className='text-dark text-2xl font-bold bg-[#73D677] rounded-xl px-8 shadow-[0_6px_0_0_#56a759] py-2 '>
            <NavLink to='/pokedex'>See pokemons</NavLink>
          </button>
        </div>
      </div>
      <div className='w-1/2'>
        <img src={bannerPicachu} alt='imagem do pikachu tacando um pokeball' />
      </div>
    </section>
  );
}
