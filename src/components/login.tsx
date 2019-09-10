import React, {useContext, useState} from 'react';
import Context from './context';
import {translations} from '../translations/home';
import loading from '../images/loading.svg';
import {Error} from './error'

interface propsInterface {
  toggleModal: (event: any) => void,
  toggleLogin: (event: any) => void,
}

const Login: React.FC<propsInterface> = (props) => {
  const { global, setGlobal } = useContext(Context) as {global: any; setGlobal: React.Dispatch<React.SetStateAction<any>>};
  const [state, setState] = useState({loading: false, email: '', password: '', emailError: '', passwordError: ''});
  const formValue = (event: React.ChangeEvent<HTMLInputElement>) => {setState({...state, [event.target.name]: event.target.value})}
  const txt = translations[global.language];

  async function submitForm() {
    const valid = validate(state.email, state.password);
    if (valid) {
      setState({...state, loading: true, emailError:'', passwordError: ''});
      const response = await fetch(`${global.apiUrl}/user/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: state.email, password: state.password})
      });
      const content = await response.json();
      if (response.status === 200) {
        if (Array.isArray(content)) {
          setState({...state, loading: false, emailError: content[0].message, passwordError: ''});
        } else {
          if (!content.emailConfirmed) localStorage.setItem('warning', 'confirm');
          localStorage.setItem('jwtToken', content.jwtToken);
          localStorage.setItem('fullName', content.fullName);
          setState({...state, loading: false, emailError: '', passwordError: ''});
          setGlobal({...global, warning: 'confirm', loggedIn: true, fullName: content.fullName});
        }
      } else {
        setState({...state, emailError: content.message || content[0].message});
      }
    };
  };


  function validateEmail(email: string) {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email) return txt.emailIsRequired;
    if (!emailRegex.test(email)) return txt.emailIsInvalid; 
    return ''; 
  }

  function validatePassword(password: string) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?:.{6,})$/;
    if (!password) return txt.passwordIsRequired;
    if (!passwordRegex.test(password)) return txt.passwordLength;
    return '';
  }

  function validate(email: string, password: string) {
    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setState({...state, emailError, passwordError});
    
    if (emailError && emailInput) emailInput.classList.add("error")
    else if (emailInput) emailInput.classList.remove("error")
    
    if (passwordError && passwordInput) passwordInput.classList.add("error")
    else if (passwordInput) passwordInput.classList.remove("error")
    
    if (emailError || passwordError) return false
    else return true
  }

  return (
    <div className='join'>
      <div className='title'>Login</div> 
      <p className='text'>{txt.worbliIs}</p>
      <span>
        <label className="label">{txt.email}</label>
        <input
          id="loginEmail"
          type="input" 
          className="input-text" 
          name="email" 
          placeholder={txt.emailAddress}
          onChange={formValue}
        ></input>
        {state.emailError &&<Error message={state.emailError}/>}
      </span>
      <span>
        <label className="label">{txt.password}</label>
        <input 
          id="loginPassword"
          type="password" 
          className="input-text" 
          name="password" 
          placeholder={txt.yourPassword}
          onChange={formValue}
        ></input>
        {state.passwordError && <Error message={state.passwordError}/>}
      </span>       
      <button className="btn-join" onClick={submitForm}>
        {!state.loading ? 'Join Now!' : <img src={loading} alt="loading" className='loading'/>}
      </button>
      <p className='small-text'>{txt.newToWorbli} <span onClick={props.toggleLogin}> {txt.joinWorbli}</span></p>
    </div>
  );
}

export {Login};
