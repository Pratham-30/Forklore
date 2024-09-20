import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurants, setlistOfRestaurants] = useState([]);
  const [filteredRestaurant, setfilteredRestaurant] = useState([]);
  const [searchText, setsearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.87560&lng=80.91150&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    setlistOfRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setfilteredRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    return (
      <h1>Looks like you're offline!! Please check your internet connection</h1>
    );

  // Conditional rendering
  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body bg-[#E5E5E5]">
      <div className="flex flex-col items-start mx-2 mb-4">
        <div className="flex items-center mb-2">
          <input
            type="text"
            className="border border-solid border-black text-xs px-2 py-1 w-64"
            value={searchText}
            placeholder="Search Cuisines or Restaurants"
            onChange={(e) => {
              setsearchText(e.target.value);
            }}
          />
          <button
            className="px-2 mx-1 bg-[#bfad9d] rounded-md shadow-lg hover:bg-[#b4977f]"
            onClick={() => {
              const filteredRestaurant = listOfRestaurants.filter((res) => {
                const nameMatches = res.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase());

                const cuisinesMatches = res.info.cuisines.some((cuisine) =>
                  cuisine.toLowerCase().includes(searchText.toLowerCase())
                );

                return nameMatches || cuisinesMatches; // Matches either name or cuisine
              });

              setfilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
          <button
            className="px-2 bg-[#bfad9d] rounded-md shadow-lg hover:bg-[#b4977f] mx-1"
            onClick={() => {
              const filteredlist = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4.3
              );
              setfilteredRestaurant(filteredlist);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-around gap-8">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            <RestaurantCard resdata={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
