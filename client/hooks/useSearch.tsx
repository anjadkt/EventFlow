import { SearchContext } from "@/context/SearchContext";
import { useContext } from "react";

export function useSearch() {

    const context = useContext(SearchContext);

    if (!context) throw new Error("useAuth must be used inside AuthProvider");

    return context;
}