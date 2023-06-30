import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/CocktailCard";

const CocktailCard = ({id, name, image, info, glass}) => {
  return (
    <Wrapper>
        <div className="img-container">
            <img src={image} alt={name}  className="img"/>
        </div>
        <div className="footer">
            <h4>{name}</h4>
            <h4>{glass}</h4>
            <Link to={`/cocktail/${id}`} className="btn">Details</Link>
        </div>
    </Wrapper>
  )
}

export default CocktailCard;