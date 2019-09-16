import React, {useContext, useRef, useState} from 'react';
import Context from '../components/context';
import {translations} from '../translations/home';
import {RouteComponentProps} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {Error} from '../components/error'
import loading from '../images/loading.svg';

interface MyProps {
    resetCode: string,
}

const Reset: React.FC<RouteComponentProps<MyProps>> = (props) => {
    const [state, setState] = useState({loading: false, resetPassword: '', resetPasswordConfirm: '', resetPasswordError: '', resetPasswordConfirmError:''});
    const { global } = useContext(Context) as {global: any};
    const formValue = (event: React.ChangeEvent<HTMLInputElement>) => {setState({...state, [event.target.name]: event.target.value.trim()})}
    const txt = translations[global.language];

    const resetCode = props.match.params.resetCode;
    if (resetCode) console.log(resetCode);
    let linkToHome = useRef<HTMLDivElement>(null);

    const resetPassword = useRef<HTMLInputElement>(null);
    const resetPasswordConfirm = useRef<HTMLInputElement>(null);
      
    async function submitForm() {
        if(state.resetPassword && state.resetPasswordConfirm) console.log('fire');

    };

  return (
    <div className='page' id='page'>
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