import React from 'react';
import './main.css';
import { Route,Routes,BrowserRouter} from 'react-router-dom';
import Login from './Components/Login';
import Academic_Staff_Home from './Components/Academic_Staff_Home';
import Employee_Home from './Components/Employee_Home';


function App() {

  return (
    <>

    <BrowserRouter>
    <Routes>

      <Route path='/' index element={<Login />}/>
      <Route path='Academic_Staff_Home'  element={<Academic_Staff_Home />}/>
      <Route path='Employee_Home'  element={<Employee_Home />}/>

    </Routes>
    </BrowserRouter>
    

    </>
  )
}

export default App
