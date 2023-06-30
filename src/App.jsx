import { RouterProvider, createBrowserRouter } from "react-router-dom";
import  {About, Cocktail, Error, HomeLayout, Landing,Newsletter, SinglepageError} from './pages';
import { loader as landingLoader} from "./pages/Landing";
import { loader as singleCocktailLoader} from "./pages/Cocktail";
import { action as newsLetterAction} from './pages/Newsletter';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: { 
    queries: {
      staleTime: 1000 * 60 * 5, //provided value is 5 minutes. the default unit is miliseconds. need to convert to 5 minutes(1000*60*5).
                            // this will tell how long query will be valid.
    }
  }
});
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement:  <Error />,
    children: [ //inside this route, every path will be relative to this parent path which is "/"
              {
                index: true, // set the Landing Component to be the default index.
                errorElement: <SinglepageError />,
                loader: landingLoader(queryClient),
                element: <Landing />,
              },
              { 
                path: 'cocktail/:id', // this will be /cocktail
                errorElement: <SinglepageError />,
                loader: singleCocktailLoader(queryClient),
                element: <Cocktail />
              },
              {
                path: 'newsletter', // this will be /newsletter
                action: newsLetterAction,
                element: <Newsletter />
              },
              {
                path: 'about', // this will be /about
                element: <About />
              }
    ]
  },

]);
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
 
};
export default App;
