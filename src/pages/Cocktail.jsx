import axios from "axios";
import { useLoaderData, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/CocktailPage";
import { useQuery } from "@tanstack/react-query";

const singleCocktailUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const singleCocktailQuery = (id) => {
  return {
    queryKey: ['cocktail',id],
    queryFn: async()=>{
      const {data} = await axios.get(`${singleCocktailUrl}${id}`);
      
      return data;
    }
  }
}

export const loader = (queryClient) => async ({params}) =>{
  const {id} = params;
  await queryClient.ensureQueryData(singleCocktailQuery(id));
      //queryClient came from the app.jsx that contains data from api
      // .ensureQueryData method will check if the data is passing has already cache or not.
           //if already cached will not process refetch. If not, will cache it and refetch the data and goes to useQuery hook.
  return {id};
}

const Cocktail = () => {
  const {id} = useLoaderData();
  const {data} = useQuery(singleCocktailQuery(id));

  if(!data) return ( // aside from SinglePageError component trigger, this checking method if the api has no data back(id we input has no data in the api)
                    // will trigger this return and will not proceed to read down the code.
      <Wrapper> 
        <header> 
            <Link to='/' className="btn">Back Home</Link>
            <h3>Something went wrong...</h3>
        </header>
      </Wrapper>);

  const singleDrinks = data.drinks[0];
    const { strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions } = singleDrinks;

  const ingredients = Object.keys(singleDrinks) 
                              .filter(key => key.startsWith('strIngredient') && singleDrinks[key] !== null)
                              .map(key => singleDrinks[key]);          
                              // this program will search inside the object that has initial property name of strIngredients and has not null.


  return (
     <Wrapper>
        <header>
          <Link to='/' className="btn">Back Home</Link>
          <h3>{name}</h3>
        </header>

        <div className="drink">
          <img src={image} alt={name} className="img"/>
          <div className="drink-info">
            <p>
              <span className="drink-data">Name :</span>
              {name}
            </p>
            <p>
              <span className="drink-data">category :</span>
              {category}
            </p>
            <p>
              <span className="drink-data">info :</span>
              {info}
            </p>
            <p>
              <span className="drink-data">Ingredients :</span>
              {ingredients.map((ingredient,index)=>{
                return <span className="ing" key={ingredient}>
                            {ingredient} 
                            {index !== ingredients.length -1 && ','} 
                            {/* put comma in between but no at the last value */}
                            &nbsp;
                        </span>
              })}
            </p>
            <p>
              <span className="drink-data">instructions :</span>
              {instructions}
            </p>
          </div>
        </div>
     </Wrapper>
  )
}

export default Cocktail;