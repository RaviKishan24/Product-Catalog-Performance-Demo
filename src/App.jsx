import { useCallback, useEffect, useMemo, useState } from "react";
import ProductList from "./ProductList";
import products from "./data.json";

const App = () => {
  const [msg, setMsg] = useState("No Product Selected");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const productperPage = 30;

  const filteredProducts = useMemo(() => {
    const term = debouncedSearch.toLowerCase();
    return products.filter((p) =>
      p.title.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
  }, [debouncedSearch]);


  const currentProducts = useMemo(() => {
    const statIndex = (currentPage - 1) * productperPage;
    return filteredProducts.slice(statIndex, statIndex + productperPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(
    filteredProducts.length / productperPage
  )



  const handleClick = useCallback((item) => {
    setMsg(`${item} is selected`);
  }, []);

  
  useEffect(() => {
    console.log("App Mounted");
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 2000)

    return(()=>clearInterval(timer))
  }, [search]);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-[1800px] mx-auto px-6 py-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            React Performance Optimization with usememo,useCallback,memo with pagingnation
          </h1>


        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-slate-700 mb-4">
              Search Product
            </h2>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="
                w-full
                border
                border-slate-300
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
              "
            />
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-slate-700 mb-4">
              Selected Product
            </h2>

            <div className="flex items-center h-[52px]">
              <p className="text-lg font-medium text-green-600">
                {msg}
              </p>
            </div>
          </div>
        </div>

        <ProductList
          products={currentProducts}
          onClick={handleClick}
        />
      </div>



      <div className="join flex justify-center mt-8">

        <button
          className="join-item btn"
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage((prev) => prev - 1)window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

          }
        >
          Previous
        </button>

        <button className="join-item btn btn-active">
          {currentPage}
        </button>

        <button
          className="join-item btn"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => prev + 1) window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

          }
        >
          Next
        </button>

      </div>
    </div>




  );
};

export default App;