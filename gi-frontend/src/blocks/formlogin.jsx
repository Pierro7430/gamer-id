import React from "react";
import { useState } from 'react';
import {Link} from "react-router-dom";
import Input from '../components/input';
import Button from '../components/button';

// Form login
// extends React.Component 
function FormLogin(props){

  //  ────────♡────────
  //  DEFINE VARIABLES
  //  ─────────────────
  const [nameid, setNameid] = useState('');
  const [pass, setPass] = useState('');

  //  ────────♡────────
  //  FUNCTIONS
  //  ─────────────────
  //  handleClick fire when you submit the form 
  //  ─────────────────
  function handleClick(e) {
    e.preventDefault();
    console.log("name:"+nameid);
    if (pass) console.log("mot de passe renseigné");
    //  ────────♡────────
    // TODO 
    // VERIFICATION LOGIN
    //  ─────────────────
  }

  //  ────────♡────────
  //  CONTENT
  //  ─────────────────
  return (
    <div className="b-form-login">
      <form>
        <Input 
          //onSelectLanguage={this.handleLanguage} 
          label={'Identifiant'} 
          type={'text'} 
          id={'name'} 
          addClass={'mt-xl'} 
          setValue={setNameid}
        />
        <Input 
          label={'Mot de passe'} 
          type={'password'} 
          id={'pass'} 
          addClass={'mt-xl'} 
          setValue={setPass}
        />

        <Button /*onClick={getValues}*/ 
          content={'button'} 
          type={'submit'} 
          addClass={'mt-xxl'} 
          onClick={handleClick}
        />

        <div className="mt-xxl">
          <Link to="/register" >S'inscrire</Link>
        </div>

        <div className="mt-xxl">
          <Link to="/hello" >page interne</Link>
        </div>
        
      </form>
    </div>
  );
};

export default FormLogin;