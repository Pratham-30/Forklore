import { useState } from "react";
import ItemsList from "./ItemsList";

const RestaurantCategory = ({ data }) => {

    const [showItems,setshowItems]=useState(false);
    
    
    const handleClick =() =>{
      setshowItems(!showItems);  
    };

  return (
    <div>
      <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4 ">
        <div className="flex justify-between cursor-pointer" onClick={handleClick}>
        <span className="text-lg font-bold">
          {data.title} ({data.itemCards.length})
        </span>
        <span>{showItems?"🔼":"🔽"}</span>
        </div>
        { showItems &&<ItemsList items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
