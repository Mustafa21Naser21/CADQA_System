import React from 'react';
import './main.css';
import { Route,Routes,BrowserRouter} from 'react-router-dom';
import Login from './Components/Login';


function App() {

  return (
    <>

    <BrowserRouter>
    <Routes>

      <Route path='/' index element={<Login />}/>

    </Routes>
    </BrowserRouter>
    

    </>
  )
}

export default App
