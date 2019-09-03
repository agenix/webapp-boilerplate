import React, {useContext, useState} from 'react';
import Context from './context';
import {translations} from '../translations/home';
import loading from '../images/loading.svg';

interface propsInterface {
    title: string; 
}

const Modal: React.FC<propsInterface> = (props) => {
  const { global } = useContext(Context) as {global: any; setGlobal: React.Dispatch<React.SetStateAction<any>>};
  const [state, setState] = useState({loading: false, email: '', password: ''});
  const formValue = (event: React.ChangeEvent<HTMLInputElement>) => {setState({...state, [event.target.name]: event.target.value})}
  const txt = translations[global.language];
  let modalState = false;
  
  function toggleModal(event: any) {
    if (event.target.id !== 'modal') return;
    modalState = !modalState;
    const modal = document.getElementById('modal');
    const form = document.getElementById('form');
    if (modal && form && modalState === true) {
      modal.style.display = "flex";
      modal.animate([{backgroundColor: 'rgba(0, 0, 0, 0)'}, {backgroundColor: 'rgba(0, 0, 0, 0.6)'}], {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      form.animate([{opacity: 0}, {opacity: 1}], {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      form.animate([{transform: 'translateY(-200px)'}, {transform: 'translateY(0)'}], {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
    }
    if (modal && form && modalState === false) {
      modal.animate([{backgroundColor: 'rgba(0, 0, 0, 0.6)'}, {backgroundColor: 'rgba(0, 0, 0, 0)'}], {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      form.animate([{opacity: 1}, {opacity: 0}],{duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      form.animate([{transform: 'translateY(0)'}, {transform: 'translateY(-200px)'}], {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      setTimeout(() => modal.style.display = "none", 200);
    }
  }
  async function submitForm() {
    console.log(global.apiUrl);
    setState({...state, loading: true});
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
    } else {
      console.log(content.message);
    }
    setState({...state, loading: false});
  }


  return (
    <div>
      <div className='modal' id='modal' onClick={toggleModal}>
        <div className='form' id='form'>

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
          </span>       
          <button className="btn-join" onClick={submitForm}>
            {!state.loading ? 'Join Now!' : <img src={loading} alt="loading" className='loading'/>}
          </button>
          
          <p className='small-text'>{txt.alreadyOnWorbli} <span>{txt.logIn}</span></p>

        </div>
      </div>
      <div onClick={toggleModal} className='modal-title' id='modal'> {props.title}</div>
    </div>
  );
}

export {Modal};
