import { Form, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/SearchForm";

const SearchForm = ({searchTerm}) => {
  const formState = useNavigation();
  const isSubmitting = formState.state === 'submitting';
  return (
    <Wrapper>
      <Form className="form">
        <input type="search" name="search" id="search" className="form-input" defaultValue={searchTerm}/>
        <button type="submit" className="btn" disabled={isSubmitting}>{isSubmitting? 'submitting' : 'submit'}</button>
      </Form>

    </Wrapper>
  )
}

export default SearchForm;