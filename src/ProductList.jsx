import { memo } from "react";
import data from "./data.json"

const ProductList = ({ products, onClick }) => {
  console.log("ProductList Re-rendered");

  return (
    <div className="w-full">

      <h4 className="text-2xl font-bold mb-8">
        Total  Products ({data.length})
      </h4>
      <h2 className="text-3xl font-bold mb-8">
        Products  per page ({products.length})
      </h2>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-6
        "
      >
        {products.map((p) => {
          const discountPercentage = Math.round(
            ((p.price - p.discountPrice) / p.price) * 100
          );

          return (
            <div
              key={p.id}
              className="
                bg-white
                rounded-2xl
                overflow-hidden
                border
                border-gray-200
                shadow-md
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-300
                flex
                flex-col
              "
            >

              <div className="relative">
                <img
                  src={p.image}
                  alt={p.title}
                  className="
                    w-full
                    h-60
                    object-cover
                    bg-gray-100
                  "
                  loading="lazy"
                />

                <span
                  className="
                    absolute
                    top-3
                    left-3
                    bg-red-500
                    text-white
                    text-xs
                    font-semibold
                    px-3
                    py-1
                    rounded-full
                  "
                >
                  {discountPercentage}% OFF
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">

                <p className="text-xs uppercase tracking-wider text-gray-400">
                  {p.category}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span
                    className="
                      bg-green-600
                      text-white
                      text-xs
                      px-2
                      py-1
                      rounded
                    "
                  >
                    ⭐ {p.rating}
                  </span>

                  <span className="text-xs text-gray-500">
                    Stock: {p.stock}
                  </span>
                </div>


                <p
                  className="
                    text-sm
                    text-gray-600
                    mt-3
                    line-clamp-3
                  "
                >
                  {p.description}
                </p>
                <div className="mt-4">
                  <span
                    className="
                      bg-blue-100
                      text-blue-700
                      text-xs
                      px-3
                      py-1
                      rounded-full
                    "
                  >
                    {p.pack}
                  </span>
                </div>
                <div className="mt-5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-2xl font-bold text-green-600">
                      ₹{p.discountPrice.toLocaleString()}
                    </span>

                    <span className="line-through text-gray-400">
                      ₹{p.price.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-green-600 text-sm font-medium mt-1">
                    Save ₹
                    {(p.price - p.discountPrice).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => onClick(p.name)}
                  className="
                    mt-auto
                    w-full
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    font-semibold
                    py-3
                    rounded-xl
                    transition-all
                    duration-300
                  "
                >
                  Add To Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(ProductList);