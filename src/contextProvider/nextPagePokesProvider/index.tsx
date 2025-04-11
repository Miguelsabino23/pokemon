import { createContext, useState } from "react";

export const NextPageContext = createContext<{
  nextPagePokes: number;
  setNextPagePokes: React.Dispatch<React.SetStateAction<number>>;
}>({
  nextPagePokes: 0,
  setNextPagePokes: () => {},
});

export function NextPageProvider({ children }: { children: React.ReactNode }) {
  const [nextPagePokes, setNextPagePokes] = useState<number>(0);

  return (
    <NextPageContext.Provider value={{ nextPagePokes, setNextPagePokes }}>
      {children}
    </NextPageContext.Provider>
  );
}
