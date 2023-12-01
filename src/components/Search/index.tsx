import { useState } from "react";

export function Search(props: {
  data: any[];
  setSearchResults: (arg0: any) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const results = props.data.filter((venue) => {
      return venue.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    props.setSearchResults(results);
  };

  return (
    <div className="mb-4 rounded-2xl drop-shadow">
      <form id="search-form" onKeyUp={handleSearch}>
        <label htmlFor="search" className="flex">
          <input
            id="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="mx-auto w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-green dark:focus:border-pink text-dark-green dark:bg-dark-green dark:text-white-pink dark:border-green dark:placeholder-white-pink focus:ring-green dark:focus:ring-pink"
          />
        </label>
      </form>
    </div>
  );
}

export default Search;
