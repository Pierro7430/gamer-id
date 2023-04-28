import React, { Component }  from 'react';
import logo from './images/logo.svg';
import FormLogin from './blocks/formlogin';
import FormRegister from './blocks/formregister';
import Hello from './blocks/hello';
import './styles/App.scss';
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";



function App() {
  return (
    <div className="App">
        <header className="App-header">
          Gamers ID
        </header>

        <Routes>
          <Route path="/" element={<FormLogin />} />
          <Route path="/register" element={<FormRegister />} />
          <Route path="/hello" element={<Hello />} />
        </Routes>

    </div>
  );
}

export default App;
