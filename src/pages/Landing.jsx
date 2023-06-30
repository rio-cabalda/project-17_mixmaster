import axios from "axios";
import { useLoaderData, useNavigation } from "react-router-dom"
import CocktailList from "../components/CocktailList";
import SearchForm from '../components/SearchForm';
import { useQuery } from "@tanstack/react-query";

const cocktailSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const searchCocktailsQuery = (searchTerm) => {
    return {
      queryKey: ['search', searchTerm || 'all'], //search is the name of cache. if searchTerm is valid will return the searched gin, if not it will return all cocktails.
      queryFn: async () => {
        const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
        return response.data.drinks;
      }
    }
  }

export const loader = (queryClient) => async ({request}) => { // the request has a GET method in it and has a url  
  const newURL = new URL(request.url);
  // the approach in the passing of the search data to api, we need new URL and have a query string to append search data coming from the form.
  // newURL.searchParams.get('search') - will find search in the url and get the value (?search=vodka)
  const searchTerm = newURL.searchParams.get('search') || '';
  await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));
      //queryClient came from the app.jsx that contains data from api
      // .ensureQueryData method will check if the data is passing has already cache or not.
           //if already cached will not process refetch. If not, will cache it and refetch the data and goes to useQuery hook.
  return { searchTerm};
}

const Landing = () => {
  const { searchTerm} = useLoaderData(); //get the data of the exported loader. the loader is define also in the app.jsx as loader: landingLoader
                                                // this useLoaderData is execute before before initial render happen.
  const {data: drinks} = useQuery(searchCocktailsQuery(searchTerm));
 
  const formState = useNavigation(); 
  return (
    <>
      <SearchForm searchTerm={searchTerm}/>
      <CocktailList drinks={drinks}/>
    </>
  )
}

export default Landing;