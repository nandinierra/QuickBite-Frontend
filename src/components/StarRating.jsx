import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt, faStar as faStarEmpty } from "@fortawesome/free-solid-svg-icons";


const StarRating = (props) => {
    const {rating} = props
  return (
    <div className="flex ">
      {[...Array(5)].map((_, i) => {
        const index = i + 1;
        if (index <= Math.floor(rating)) {
          return <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-400 text-sm" />;
        } else if (index === Math.ceil(rating) && rating % 1 !== 0) {
          return <FontAwesomeIcon key={index} icon={faStarHalfAlt} className="text-yellow-400 text-sm" />;
        } else {
          return <FontAwesomeIcon key={index} icon={faStarEmpty} className="text-gray-300 text-sm" />;
        }
      })}
    </div>
  )
}

export default StarRating
