import { useState } from "react";

export function Search(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchResults([]);
    const results = props.data.filter((venue) => {
      return venue.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    props.setSearchResults(results);

    console.log(results);
  };

  return (
    <div className="mb-4 rounded-2xl">
      <form id="search-form" onKeyUp={handleSearch}>
        <label htmlFor="search">
          <input
            id="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className=" mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-pink"
          />
        </label>
      </form>
    </div>
  );
}

export default Search;
