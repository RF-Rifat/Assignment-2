import { useState } from "react";
import "./App.css";
import BookCard from "./components/BookCard";
import Navbar from "./components/Navbar";
import { useEffect } from "react";

function App() {
  const [cardData, setCardData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        setCardData(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Filtering the cards based on the search term
  const filteredCards = cardData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting the cards based on the selected option
  const sortedCards = [...filteredCards].sort((a, b) => {
    switch (sortBy) {
      case "name_asc":
        return a.name.localeCompare(b.name);
      case "name_desc":
        return b.name.localeCompare(a.name);
      case "year_asc":
        return a.publicationYear - b.publicationYear;
      case "year_desc":
        return b.publicationYear - a.publicationYear;
      default:
        return 0;
    }
  });
  return (
    <div className="relative font-[Manrope] before:fixed before:left-0 before:top-0 before:-z-10 before:h-[435px] before:w-full before:rounded-bl-3xl before:bg-[#EAE6D7] max-md:px-4 lg:text-lg before:lg:rounded-bl-[79px]">
      <Navbar />
      <main className="my-10 lg:my-14">
        {/* search function */}
        <header className="mb-8 lg:mb-10 mx-auto max-w-7xl">
          <div className="mx-auto flex items-end justify-between max-md:max-w-[95%] max-md:flex-col max-md:items-start max-md:space-y-4">
            {/* info , title , search */}
            <div>
              <h6 className="mb-2 text-base lg:text-xl">Trending on 2021</h6>
              <h2 className="mb-6 font-['Playfair_Display'] text-3xl font-bold lg:text-4xl">
                Trending Books of the Year
              </h2>
              {/* Search Box */}
              <form>
                <div className="flex">
                  <div className="relative w-full overflow-hidden rounded-lg border-2 border-[#1C4336] text-[#1C4336] md:min-w-[380px] lg:min-w-[440px]">
                    <input
                      type="search"
                      onSubmit={(e) => setSearchTerm(e.target.value)}
                      id="search-dropdown"
                      className="z-20 block w-full bg-white px-4 py-2.5 pr-10 text-[#1C4336] placeholder:text-[#1C4336] focus:outline-none"
                      placeholder="Search Book"
                      value={searchTerm}
                      // onChange={(e) => setSearchTerm(e.target.value)}
                      required=""
                    />
                    <div className="absolute right-0 top-0 flex h-full items-center">
                      <button
                        type="submit"
                        className="mr-1.5 flex items-center space-x-1.5 rounded-md rounded-e-lg bg-[#1C4336] px-4 py-2.5 text-sm text-white"
                      >
                        <svg
                          className="h-[14px] w-[14px]"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                        <span>Search</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              {/* Search Box Ends */}
            </div>
            {/* sort - filter */}
            <div className="flex items-stretch space-x-3">
              {/* Sort */}
              <select
                className="cursor-pointer rounded-md border px-4 py-2 text-center text-gray-600"
                name="sortBy"
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Sort</option>
                <option value="name_asc">Name (A-Z)</option>
                <option value="name_desc">Name (Z-A)</option>
                <option value="year_asc">Publication Year (Oldest)</option>
                <option value="year_desc">Publication Year (Newest)</option>
              </select>
            </div>
          </div>
        </header>
        {/* book cards */}
        <div className="container mx-auto grid grid-cols-1 gap-8 max-w-7xl md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedCards.map((item) => (
            <BookCard key={item.name} cardData={item} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
