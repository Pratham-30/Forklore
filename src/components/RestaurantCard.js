import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resdata } = props;
  return (
    <div className=" h-full m-4 p-4 w-[280px] bg-[#e2d0c0] rounded-md hover:bg-[#f1d1b6] items-stretch shadow-lg">
      <img
        className="rounded-md w-60 h-60 ml-1"
        alt="res-logo"
        src={CDN_URL + resdata.info.cloudinaryImageId}
      ></img>
      <h3 className="font-bold py-2 text-lg">{resdata.info.name}</h3>
      <h4 className="object-contain">
        {resdata.info.cuisines.map((cuisine, index) => (
          <span key={index}>
            {cuisine}
            {index < resdata.info.cuisines.length - 1 && ", "}
          </span>
        ))}
      </h4>

      <h4>{resdata.info.avgRating}</h4>
      <h4>{resdata.info.sla.deliveryTime + " minutes"}</h4>
      <h4>{resdata.info.costForTwo}</h4>
    </div>
  );
};

<h1></h1>;

export default RestaurantCard;

