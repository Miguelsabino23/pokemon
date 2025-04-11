import { useContext } from "react";
import { NextPageContext } from "../../../../contextProvider/nextPagePokesProvider";

export function NextAndPreviwPagePoke() {
  const { setNextPagePokes } = useContext(NextPageContext);

  const handleNextPage = (page: number) => {
    setNextPagePokes(page);
  };
  return (
    <div className='flex w-full justify-center'>
      <ul className='flex gap-4 list-disc mt-3 text-dark'>
        <li className='cursor-pointer' onClick={() => handleNextPage(0)}></li>
        <li className='cursor-pointer' onClick={() => handleNextPage(9)}></li>
        <li className='cursor-pointer' onClick={() => handleNextPage(17)}></li>
      </ul>
    </div>
  );
}
