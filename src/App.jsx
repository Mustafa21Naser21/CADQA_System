import React from 'react';
import './main.css';
import { Route,Routes,BrowserRouter} from 'react-router-dom';
import Login from './Components/Login';
import Academic_Staff_Interface from './Components/Academic_Staff_Interface';


function App() {

  return (
    <>

    <BrowserRouter>
    <Routes>

      <Route path='/' index element={<Login />}/>
      <Route path='Academic_Staff_Interface'  element={<Academic_Staff_Interface />}/>

    </Routes>
    </BrowserRouter>
    

    </>
  )
}

export default App
