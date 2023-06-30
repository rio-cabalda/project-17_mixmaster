import { useRouteError } from "react-router-dom"


const SinglepageError = () => {

    const error = useRouteError();
    console.log(error.message);

  return (
    <h2>There was an error..</h2>
  )
}

export default SinglepageError;