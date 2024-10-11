/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, ReactNode } from "react";

interface FilterContextProps {
  searchQuery: string;
  selectedCategory: string;
  sortOrder: string;
  currentPage: number;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortOrder: (order: string) => void;
  setCurrentPage: (page: number) => void;
}

const FilterContext = createContext<FilterContextProps | null>(null);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        selectedCategory,
        sortOrder,
        currentPage,
        setSearchQuery,
        setSelectedCategory,
        setSortOrder,
        setCurrentPage,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = React.useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};
