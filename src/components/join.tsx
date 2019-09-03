import React, {useContext, useState} from 'react';
import Context from './context';
import {translations} from '../translations/home';
import loading from '../images/loading.svg';

const Join: React.FC = () => {
  const { global } = useContext(Context) as {global: any; setGlobal: React.Dispatch<React.SetStateAction<any>>};
  const [state, setState] = useState({loading: false, email: '', password: ''});
  const formValue = (event: React.ChangeEvent<HTMLInputElement>) => {setState({...state, [event.target.name]: event.target.value})}
  const txt = translations[global.language];

  async function submitForm() {
    setState({...state, loading: true});
    // validate the data before sending it!
    // show error message to the UI
    const response = await fetch(`${global.apiUrl}/user/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: state.email, password: state.password})
    });
    const content = await response.json();
    if(response.status === 200) {
      console.log(content.message);
      // next?
    } else {
      console.log(content.message);
      // show error message to the UI
    }
    setState({...state, loading: false});
  }


  return (
    <div className='join'>
      <div className='title'>{txt.joinWorbli}</div> 
      <p className='text'>{txt.worbliIs}</p>
      <span>
        <label className="label">{txt.email}</label>
        <input 
          type="input" 
          className="input-text" 
          name="email" 
          placeholder="Email address" 
          onChange={formValue}
        ></input>
        <small>error</small>
      </span>
      <span>
        <label className="label">{txt.password}</label>
        <input 
          type="password" 
          className="input-text" 
          name="password" 
          placeholder="Create a password" 
          onChange={formValue}
        ></input>
        <small>error</small>
      </span>       
      <button className="btn-join" onClick={submitForm}>
        {!state.loading ? 'Join Now!' : <img src={loading} alt="loading" className='loading'/>}
      </button>
      <p className='small-text'>{txt.alreadyOnWorbli} <span>{txt.logIn}</span></p>
    </div>
  );
}

export {Join};
