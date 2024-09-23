
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info || {};

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="text-center">
      <h1 className="font-extrabold my-10 text-3xl">{name}</h1>
      <p className="font-semibold text-2xl">
        {cuisines?.join(", ")} - {costForTwoMessage}
      </p>

      {categories?.map((category, index) => (
        <RestaurantCategory
          key={category?.card?.card?.title || index} // Use category title or fallback to index
          data={category?.card?.card}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
