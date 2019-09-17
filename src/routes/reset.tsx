import React, {useContext, useRef, useState} from 'react';
import Context from '../components/context';
import {translations} from '../translations/home';
import {RouteComponentProps} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {Error} from '../components/error'
import loading from '../images/loading.svg';

interface MyProps {
    resetPasswordCode: string,
}

const Reset: React.FC<RouteComponentProps<MyProps>> = (props) => {
    const [state, setState] = useState({loading: false, resetPassword: '', resetPasswordConfirm: '', resetPasswordError: '', resetPasswordConfirmError:''});
    const { global } = useContext(Context) as {global: any};
    const formValue = (event: React.ChangeEvent<HTMLInputElement>) => {setState({...state, [event.target.name]: event.target.value.trim()})}
    const txt = translations[global.language];

    const resetPasswordCode = props.match.params.resetPasswordCode;
    const linkToHome = useRef<HTMLDivElement>(null);
    const resetPassword = useRef<HTMLInputElement>(null);
    const resetPasswordConfirm = useRef<HTMLInputElement>(null);
      
    async function submitForm() {
      const resetPasswordError = validatePassword(state.resetPassword);
      const resetPasswordConfirmError = validatePassword(state.resetPasswordConfirm)
      setState({...state, resetPasswordError, resetPasswordConfirmError});
      if(resetPassword.current && resetPasswordError) resetPassword.current.classList.add("error");
      else if (resetPassword.current) resetPassword.current.classList.remove("error")
      if(resetPasswordConfirm.current && resetPasswordConfirmError) resetPasswordConfirm.current.classList.add("error");
      else if (resetPasswordConfirm.current) resetPasswordConfirm.current.classList.remove("error");
      if (!resetPasswordError && !resetPasswordConfirmError) {
        if(state.resetPassword !== state.resetPasswordConfirm) {
          setState({...state, resetPasswordError: '', resetPasswordConfirmError: 'Passwords do not match'});
        } else {
          const response = await fetch(`${global.apiUrl}/user/confirm_password`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({newPassword: state.resetPassword, resetPasswordCode})
          });
          const content = await response.json();
          if (response.status === 200) {
            console.log(content);
          }
        }

      }
    };

    function validatePassword(password: string) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?:.{6,})$/;
      if (!password) return txt.passwordIsRequired;
      if (!passwordRegex.test(password)) return txt.passwordLength;
      return '';
    }

  return (
    <div className='page page-reset' id='page'>
        <div className='reset'>
            <div className='card'>
            <div className='title'>{txt.resetPassword}</div> 
            <p className='text'>{txt.worbliIs}</p>
            <span>
                <label className="label">{txt.password}</label>
                <input
                ref={resetPassword}
                value={state.resetPassword}
                type="input" 
                className="input-text" 
                name="resetPassword" 
                placeholder={txt.password}
                onChange={formValue}
                ></input>
                {state.resetPasswordError &&<Error message={state.resetPasswordError}/>}
        </span>
        <span>
            <label className="label">{txt.confirmPassword}</label>
            <input
            ref={resetPasswordConfirm}
            value={state.resetPasswordConfirm}
            type="input" 
            className="input-text" 
            name="resetPasswordConfirm" 
            placeholder={txt.confirmPassword}
            onChange={formValue}
            ></input>
            {state.resetPasswordConfirmError &&<Error message={state.resetPasswordConfirmError}/>}
        </span>

        <button className="btn-reset" onClick={submitForm}>
            {!state.loading ? txt.resetPassword : <img src={loading} alt="loading" className='loading'/>}
        </button>
        <Link to={{pathname: '/'}}><div ref={linkToHome}></div></Link>
        </div>
      </div>
    </div>
  );
} 

export default Reset;