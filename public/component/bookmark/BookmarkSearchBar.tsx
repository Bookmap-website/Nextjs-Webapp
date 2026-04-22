"use client";

import SearchBar from "@/public/component/Searchbar/searchbar";

type Props = {
  searchBar: string;
  setSearchBar: (v: string) => void;
  filters: any;
  setFilters: (v: any) => void;
};

export default function BookmarkSearch({
  searchBar,
  setSearchBar,
  filters,
  setFilters,
}: Props) {
  return (
    <div className="mt-6">
      <SearchBar
        value={searchBar}
        onChange={setSearchBar}
        filters={filters}
        onFilterChange={setFilters}
      />
    </div>
  );
}