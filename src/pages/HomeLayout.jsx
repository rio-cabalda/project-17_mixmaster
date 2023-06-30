import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";


function HomeLayout() {
  
  const navigation = useNavigation(); // monitor the state of the routes/ if it is loading or idle.

  const isPageLoading = navigation.state === 'loading'; // if this is true then render loading

 {/* ---- Notes: ------------   
       <Outlet />  what url(example: /about) is type it will appear here if the url is the children of this parent route.
                  but the Navbar is still on the top  
  
  */}

  return (
    <>
      <Navbar />
      <section className="page">
        
        {isPageLoading ?
          <div style={{display: 'flex', justifyContent: 'center'}}>
              <div className="loading"></div>
          </div> 
          :
            <Outlet /> 
        }

      </section>
    </>
  )
}

export default HomeLayout;