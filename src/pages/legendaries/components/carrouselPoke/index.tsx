interface CarrouselPokeProps {
  img: string;
  name: string;
  onClick?: () => void;
}

export function CarrouselPoke({ img, name, onClick }: CarrouselPokeProps) {
  return (
    <div
      className='flex flex-col w-36 h-36 items-center mb-10 cursor-pointer'
      onClick={onClick}
    >
      <div className='bg-golden-shimmer rounded-t-lg w-36'>
        <img className='' src={img} alt={name} />
      </div>
      <div className='bg-white rounded-b-lg w-full'>
        <h2 className='text-center'>{name.toUpperCase()}</h2>
      </div>
    </div>
  );
}
