import React, { Component }  from 'react';
import logo from './images/logo.svg';
import './styles/App.scss';
import FormLogin from './blocks/formlogin';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Gamers ID
      </header>
      <FormLogin />
    </div>
  );
}

export default App;
