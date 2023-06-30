import { Form, redirect, useNavigation } from 'react-router-dom';
// redirect in only use for actions and loaders.
//useNavigation checking the state and will use in the button will disable when the posting data into the server is in process.
import axios from 'axios';
import { toast } from 'react-toastify';

const newsletterUrl = 'https://www.course-api.com/cocktails-newsletter';

export const action = async({request}) =>{ // this will trigger when click the button submit.
  const formData = await request.formData(); // the result has more property but we only need the name and value of the form. 
  const data = Object.fromEntries(formData); // we need to use the method Object.fromEntries(formData) to make the name and the value convert to object.
try {
  const response = await axios.post(newsletterUrl, data); // post data from the server
  console.log(response);
  toast.success(response.data.msg);
  
} catch (error) { // handling error in form submission.
  console.log(error); // this error is design what the api back if there is an error in the server side.
  toast.error(error?.response?.data?.msg);

  return error;
}

  return redirect('/');
} 
const Newsletter = () => {
  const formState = useNavigation(); 
  const isSubmitting = formState.state === 'submitting';
  //checking the state and will use in the button will disable when the posting data into the server is in process.


  return (
   <Form className="form" method="POST">
      <h4 style={{textAlign: 'center', marginBottom: '2rem'}}>our newsletter</h4>
    {/* name */}
      <div className="form-row">
        <label htmlFor="name" className="form-label">name</label>
        <input type="text" className="form-input" name="name" id="name" required/>
      </div>
    {/* lastname */}
    <div className="form-row">
      <label htmlFor="lastName" className="form-label">last name</label>
      <input type="text" className="form-input" name="lastName" id="lastName" required/>
    </div>
    {/* email */}
    <div className="form-row">
      <label htmlFor="email" className="form-label">email</label>
      <input type="email" className="form-input" name="email" id="email" defaultValue='test@test.com' required/>
    </div>
    <button type="submit" disabled={isSubmitting} className="btn btn-block" style={{marginTop: '0.5rem'}}>
      {isSubmitting ? 'submitting' : 'submit'}
    </button>
   </Form>
  
  )
}

export default Newsletter;