import React from "react";
import { useState } from 'react';
import {Link} from "react-router-dom";
import Input from '../components/input';
import Button from '../components/button';

// Form login
function FormLogin(props){

  //  ────────♡────────
  //  DEFINE VARIABLES
  //  ─────────────────
  const [nameid, setNameid] = useState('');
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  //  ────────♡────────
  //  FUNCTIONS
  //  ─────────────────
  //  handleClick fire when you submit the form 
  //  ─────────────────
  function handleClick(e) {
    e.preventDefault();
    console.log("name:"+nameid);
    console.log("mail:"+mail);
    (pass == confirmPass) ? console.log("mot de passe validé") : console.log("mauvais mot de passe");
    // ────────♡────────
    // TODO 
    // SEND INFORMATION TO THE BACK
    //  ─────────────────
  }

  //  ────────♡────────
  //  CONTENT
  //  ─────────────────
  return (
    <div className="b-form-login">
      <form>
        <Input 
          label={'Identifiant'} 
          type={'text'} 
          id={'name'} 
          addClass={'mt-xl'} 
          setValue={setNameid}
        />
        <Input 
          label={'Mail'} 
          type={'text'} 
          id={'mail'} 
          addClass={'mt-xl'} 
          setValue={setMail}
        />
        <Input 
          label={'Mot de passe'} 
          type={'password'} 
          id={'pass'} 
          addClass={'mt-xl'} 
          setValue={setPass}
        />
        <Input 
          label={'Vérification mot de passe'} 
          type={'password'} 
          id={'confirm-pass'} 
          addClass={'mt-xl'} 
          setValue={setConfirmPass}
        />

        <Button 
          content={'button'} 
          type={'submit'} 
          addClass={'mt-xxl'} 
          onClick={handleClick}
        />
      </form>

      <div className="mt-xxl">
       
      </div>
    </div>
  );
};

export default FormLogin;