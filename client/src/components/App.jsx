import React,{useState} from "react";
import Login from './Login';
import Home from './Home';
import {BrowserRouter,Routes,Route,Navigate,Outlet} from "react-router-dom";

const PrivateRoute = ({authStatus ,...props}) =>{
  return authStatus ?
     <Outlet />
  :
  <Navigate replace to="/" />
}

function App() {
  const [authStatus,setAuthStatus] = useState(false);
  return(
  <>
  <BrowserRouter>
    <Routes>
       <Route path="/" element={<Login setAuthStatus={setAuthStatus} />} />
       <Route path="/home/:username" element={<PrivateRoute authStatus={authStatus} />} >
                <Route path='/home/:username' element={<Home />} />
       </Route>

    </Routes>
  </BrowserRouter>
  </>
  )
}

export default App;