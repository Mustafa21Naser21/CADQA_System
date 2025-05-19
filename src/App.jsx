import React from 'react';
import './main.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

// Login
import Login from './Pages/Login/Login';

// Manager
import Manager_Home from './Pages/Manager/Home';
import Manager_Statistics from './Pages/Manager/Statistics';
import Manager_UploadFile from './Pages/Manager/UploadFile';
import Manager_Categorey_Management from './Pages/Manager/Categorey_Management';
import Manager_Submissions from './Pages/Manager/Submissions';
import Manager_Edit_File from './Pages/Manager/Edit_File';
import Manager_File_Details from './Pages/Manager/File_Details';
import Manager_Notification from './Pages/Manager/Notification';
import Manager_Timeline_Record from './Pages/Manager/Timeline_Record';
import Manager_Faculty_Files from './Pages/Manager/Faculty_Files';

// Academic Staff
import Academic_Staff_Home from './Pages/Academic_Staff/Home';
import Academic_Staff_UploadFile from './Pages/Academic_Staff/UploadFile';
import Academic_Staff_Submission_Detalis from './Pages/Academic_Staff/Submission_Details';
import Academic_Staff_Statistics from './Pages/Academic_Staff/Statistics';
import Academic_Staff_Previous_Submissions from './Pages/Academic_Staff/Previous_Submissions';
import Academic_Staff_Notification from './Pages/Academic_Staff/Notification';

// Employee
import Employee_Home from './Pages/Employee/Home';
import Employee_UploadFile from './Pages/Employee/UploadFile';
import Employee_Statistics from './Pages/Employee/Statistics';
import Employee_Categorey_Management from './Pages/Employee/Categorey_Management';
import Employee_Submissions from './Pages/Employee/Submissions';
import Employee_Notification from './Pages/Employee/Notification';
import Employee_File_Details from './Pages/Employee/Fille_Details';
import Employee_Edit_File from './Pages/Employee/Edit_File';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' index element={<Login />} />

          {/* Manager Routes */}
          <Route path='Manager_Home' element={<Manager_Home />} />
          <Route path='Manager_Statistics' element={<Manager_Statistics />} />
          <Route path='Manager_UploadFile' element={<Manager_UploadFile />} />
          <Route path='Manager_Categorey_Management' element={<Manager_Categorey_Management />} />
          <Route path='Manager_Submissions' element={<Manager_Submissions />} />
          <Route path='Manager_Edit_File' element={<Manager_Edit_File />} />
          <Route path='Manager_File_Details' element={<Manager_File_Details />} />
          <Route path='Manager_Notification' element={<Manager_Notification />} />
          <Route path='Manager_Timeline_Record' element={<Manager_Timeline_Record />} />
          <Route path='Manager_Faculty_Files' element={<Manager_Faculty_Files />} />

          {/* Academic Staff Routes */}
          <Route path='Academic_Staff_Home' element={<Academic_Staff_Home />} />
          <Route path='Academic_Staff_UploadFile' element={<Academic_Staff_UploadFile />} />
          <Route path='Academic_Staff_Submission_Detalis' element={<Academic_Staff_Submission_Detalis />} />
          <Route path='Academic_Staff_Statistics' element={<Academic_Staff_Statistics />} />
          <Route path='Academic_Staff_Previous_Submissions' element={<Academic_Staff_Previous_Submissions />} />
          <Route path='Academic_Staff_Notification' element={<Academic_Staff_Notification />} />

          {/* Employee Routes */}
          <Route path='Employee_Home' element={<Employee_Home />} />
          <Route path='Employee_UploadFile' element={<Employee_UploadFile />} />
          <Route path='Employee_Statistics' element={<Employee_Statistics />} />
          <Route path='Employee_Categorey_Management' element={<Employee_Categorey_Management />} />
          <Route path='Employee_Submissions' element={<Employee_Submissions />} />
          <Route path='Employee_Notification' element={<Employee_Notification />} />
          <Route path='Employee_File_Details' element={<Employee_File_Details />} />
          <Route path='Employee_Edit_File' element={<Employee_Edit_File />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

