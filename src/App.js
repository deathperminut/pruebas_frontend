import logo from './logo.svg';
import './App.css';
import React from 'react';

//AUTH
import Login from './Router/Auth/Login/Login';
import Main from './Router/App/Main';

import { Navigate, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path='' element = {<Navigate to='/Login'></Navigate>}></Route>
        <Route path='/Login/*' element={<Login></Login>}></Route>
        <Route path='/Main/*' element={<Main></Main>}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
