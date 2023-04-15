import React from "react";
import { useState } from 'react';
import Input from '../components/input';
import Button from '../components/button';

// Form login

class FormLogin extends React.Component {
  render() {
    return (
      <div className="b-form-login">
        <form>
          <Input onSelectLanguage={this.handleLanguage} label={'Identifiant'} type={'text'} id={'name'} addClass={'mt-xl'} />
          <Input label={'Mot de passe'} type={'password'} id={'pass'} addClass={'mt-xl'} />

          <Button /*onClick={getValues}*/ content={'button'} type={'submit'} addClass={'mt-xxl'} />
        </form>
      </div>
    );
  };
};

export default FormLogin;