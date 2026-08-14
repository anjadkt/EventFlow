import { createContext , ReactNode, useState } from "react"


type SearchType = { search: string, setSearch: React.Dispatch<React.SetStateAction<any>> }


export const SearchContext = createContext<SearchType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {

  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider
        value={{
          search,
          setSearch
        }}
    >
        {children}
    </SearchContext.Provider>
  )
  
}