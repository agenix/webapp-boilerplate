import React, {useContext, useState} from 'react';
import Context from './context';
import {translations} from '../translations/home';
import loading from '../images/loading.svg';
import {Error} from './error'

interface propsInterface {
  toggleModal: (event: any) => void
  toggleLogin: (event: any) => void,
}

const Join: React.FC<propsInterface> = (props) => {
  const { global, setGlobal } = useContext(Context) as {global: any; setGlobal: React.Dispatch<React.SetStateAction<any>>};
  const [state, setState] = useState({loading: false, email: '', newPassword: '', emailError: '', passwordError: ''});
  const formValue = (event: React.ChangeEvent<HTMLInputElement>) => {setState({...state, [event.target.name]: event.target.value})}
  const txt = translations[global.language];

  async function submitForm() {
    const valid = validate(state.email, state.newPassword);
    if (valid) {
      setState({...state, loading: true, emailError:'', passwordError: ''});
      const response = await fetch(`${global.apiUrl}/user/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: state.email, password: state.newPassword})
      });
      const content = await response.json();
      if (response.status === 200) {
        if (Array.isArray(content)) {
          setState({...state, loading: false, emailError: content[0].message, passwordError: ''});
        } else {
          setState({...state, loading: false, emailError: '', passwordError: ''});
          setGlobal({...global, confirmEmail: true});
          localStorage.setItem("confirmEmail", 'true')
          console.log(content + 'You are logged in now!');
        }
      } else {
        setState({...state, emailError: content.message || response.status});
      }
    };
  };


  function validateEmail(email: string) {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Email is invalid'; 
    return ''; 
  }

  function validatePassword(password: string) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?:.{6,})$/;
    if (!password) return 'Password is required';
    if (!passwordRegex.test(password)) return 'Passwords should be 6 characters or more and have one or more upper case characters';
    return '';
  }

  function validate(email: string, password: string) {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
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
      <div className='title'>{txt.joinWorbli}</div> 
      <p className='text'>{txt.worbliIs}</p>
      <span>
        <label className="label">{txt.fullName}</label>
        <input
          id="name"
          type="input" 
          className="input-text" 
          name="name" 
          placeholder="Full name" 
          onChange={formValue}
        ></input>
        {state.emailError &&<Error message={state.emailError}/>}
      </span>
      <span>
        <label className="label">{txt.email}</label>
        <input
          id="email"
          type="input" 
          className="input-text" 
          name="email" 
          placeholder="Email address" 
          onChange={formValue}
        ></input>
        {state.emailError &&<Error message={state.emailError}/>}
      </span>
      <span>
        <label className="label">{txt.password}</label>
        <input 
          id="newPassword"
          type="password" 
          className="input-text" 
          name="newPassword" 
          placeholder="Your password" 
          onChange={formValue}
        ></input>
        {state.passwordError && <Error message={state.passwordError}/>}
      </span>       
      <button className="btn-join" onClick={submitForm}>
        {!state.loading ? 'Join Now!' : <img src={loading} alt="loading" className='loading'/>}
      </button>
      <p className='small-text'>{txt.alreadyOnWorbli} <span onClick={props.toggleLogin}>{txt.logIn}</span></p>
    </div>
  );
}

export {Join};
