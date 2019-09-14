import React, {useContext, useState, useEffect, useRef} from 'react';
import Context from './context';
import {translations} from '../translations/home';
import loading from '../images/loading.svg';
import {Error} from './error'
import {Link} from 'react-router-dom';

interface propsInterface {
  toggleModal: (event: any) => void
  toggleLogin: (event: any) => void
}

const Join: React.FC<propsInterface> = (props) => {
  const { global, setGlobal } = useContext(Context) as {global: any; setGlobal: React.Dispatch<React.SetStateAction<any>>};
  const [state, setState] = useState({loading: false, email: '', newPassword: '', fullName: '', emailError: '', passwordError: '', fullNameError:''});
  const formValue = (event: React.ChangeEvent<HTMLInputElement>) => {setState({...state, [event.target.name]: event.target.value.trim()})}
  const txt = translations[global.language];

  const inputEmail = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const fullNameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputEmail.current) inputEmail.current.classList.remove("error");
    if (passwordInput.current) passwordInput.current.classList.remove("error");
    if (fullNameInput.current) fullNameInput.current.classList.remove("error");
    setState({loading: false, email: '', newPassword: '', fullName: '', emailError: '', passwordError: '', fullNameError:''});
  },[props.toggleLogin])

  async function submitForm() {
    if (validate(state.email, state.newPassword, state.fullName)) {
      setState({...state, loading: true, emailError:'', passwordError: '', fullNameError: ''});
      const response = await fetch(`${global.apiUrl}/user/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: state.email, password: state.newPassword, fullName: state.fullName})
      });
      const content = await response.json();
      if (response.status === 200) {
        setState({...state, loading: false, emailError: '', passwordError: ''});
        setGlobal({...global, warning: 'confirm', loggedIn: true, fullName: state.fullName});
        localStorage.setItem("warning", 'confirm');
        localStorage.setItem("fullName", state.fullName);
        localStorage.setItem("jwtToken", content.jwtToken);
      } else {
        setState({...state, emailError: content.message || response.status});
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

  function validateFullName(fullName: string) {
    if (!fullName) return txt.fullNameIsRequired;
    if (fullName.length > 35) return txt.fullNameIsTooLong;
    return '';
  }

  function validate(email: string, password: string, fullName: string) {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const fullNameError = validateFullName(fullName);
    setState({...state, emailError, passwordError, fullNameError});
    if (emailError && inputEmail.current) inputEmail.current.classList.add("error")
    else if (inputEmail.current) inputEmail.current.classList.remove("error")
    if (passwordError && passwordInput.current) passwordInput.current.classList.add("error")
    else if (passwordInput.current) passwordInput.current.classList.remove("error")
    if (fullNameError && fullNameInput.current) fullNameInput.current.classList.add("error")
    else if (fullNameInput.current) fullNameInput.current.classList.remove("error")
    if (emailError || passwordError || fullNameError) return false
    else return true
  }

  function goToTerms (e: any) {
    props.toggleModal(e);
    const goToTerms = document.getElementById('goToTerms');
    if (goToTerms) goToTerms.click();
  }
  function goToPrivacy (e: any) {
    props.toggleModal(e);
    const goToPrivacy = document.getElementById('goToPrivacy');
    if (goToPrivacy) goToPrivacy.click();
  }

  return (
    <div className='join'>
      <div className='title'>{txt.joinWorbli}</div> 
      <p className='text'>{txt.worbliIs}</p>
      <span>
        <label className="label">{txt.fullName}</label>
        <input
          ref={fullNameInput}
          value={state.fullName}
          type="input" 
          className="input-text" 
          name="fullName" 
          placeholder={txt.fullName}
          onChange={formValue}
        ></input>
        {state.fullNameError &&<Error message={state.fullNameError}/>}
      </span>
      <span>
        <label className="label">{txt.email}</label>
        <input
          ref={inputEmail}
          value={state.email}
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
          ref={passwordInput}
          value={state.newPassword}
          type="password" 
          className="input-text" 
          name="newPassword" 
          placeholder={txt.createAPassword}
          onChange={formValue}
        ></input>
        {state.passwordError && <Error message={state.passwordError}/>}
      </span>     

      <button className="btn-join" onClick={submitForm}>
        {!state.loading ? 'Join Now!' : <img src={loading} alt="loading" className='loading'/>}
      </button>

      <p className='small-text'> {txt.alreadyOnWorbli} 
        <span onClick={props.toggleLogin}> {txt.logIn}</span>
      </p>

      <p className='small-text'>{txt.byJoiningYouAgreeToOur}
        <span onClick={goToTerms} id='modal-join' className='no-link'> {txt.temrsOfService} </span> {txt.and} 
        <span onClick={goToPrivacy} id='modal-join' className='no-link'> {txt.privacyPolicy} </span>
      </p>

      <Link id='goToTerms' to={{pathname: '/terms'}} className='hidden' />
      <Link id='goToPrivacy' to={{pathname: '/privacy'}} className='hidden' />
    </div>
  );
}

export {Join};
