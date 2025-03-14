import React from 'react';
import './main.css';
import { Route,Routes,BrowserRouter} from 'react-router-dom';
import Login from './Components/Login';
import Academic_Staff_Home from './Components/Academic_Staff_Home';
import Employee_Home from './Components/Employee_Home';
import Manager_Home from './Components/Manager_Home';
import Manager_Statistics from './Components/Manager_Statistics';


function App() {

  return (
    <>

    <BrowserRouter>
    <Routes>

      <Route path='/' index element={<Login />}/>
      <Route path='Academic_Staff_Home'  element={<Academic_Staff_Home />}/>
      <Route path='Employee_Home'  element={<Employee_Home />}/>
      <Route path='Manager_Home'  element={<Manager_Home />}/>
      <Route path='Manager_Statistics' element={<Manager_Statistics/>}/>

    </Routes>
    </BrowserRouter>
    

    </>
  )
}

export default App
