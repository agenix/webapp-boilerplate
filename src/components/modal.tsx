import React, {useContext} from 'react';
import Context from './context';
import {translations} from '../translations/home';

interface propsInterface {
    title: string; 
}

const Modal: React.FC<propsInterface> = (props) => {
  const { global } = useContext(Context) as {global: any; setGlobal: React.Dispatch<React.SetStateAction<any>>};
  const txt = translations[global.language];
  let modalState = false;
  
  function toggleModal(event: any) {
    if (event.target.id !== 'modal') return;
    modalState = !modalState;
    const modal = document.getElementById('modal');
    const form = document.getElementById('form');
    if (modal && form && modalState === true) {
      modal.style.display = "flex";
      modal.animate([{backgroundColor: 'rgba(0, 0, 0, 0)'}, {backgroundColor: 'rgba(0, 0, 0, 0.6)'}], 
          {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
        form.animate([{opacity: 0}, {opacity: 1}], 
          {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
          form.animate([{transform: 'translateY(-200px)'}, {transform: 'translateY(0)'}], 
        {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
    }
    if (modal && form && modalState === false) {
      modal.animate([{backgroundColor: 'rgba(0, 0, 0, 0.6)'}, {backgroundColor: 'rgba(0, 0, 0, 0)'}], 
          {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      form.animate([{opacity: 1}, {opacity: 0}],
        {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      form.animate([{transform: 'translateY(0)'}, {transform: 'translateY(-200px)'}], 
        {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
        setTimeout(() => modal.style.display = "none", 200);
    }
  }

  return (
    <div>
      <div className='modal' id='modal' onClick={toggleModal}>
        <div className='close' id='modal'>+</div>
        <div className='form' id='form'>


         <div className='title'> Join Worbli</div> 
          <p className='text'>Worbli is the place to discover amazing dApps curated by our global community.</p>
          <input type="input" className="input-text" name="email" placeholder="Email address"></input>
          <input type="password" className="input-text" name="password" placeholder="Create a password"></input>          
          <button className="btn-join">Join Worbli</button>
          <p className='small-text'>Already on Worbli? <span>Log In.</span></p>
     
       


        </div>
      </div>
      <div onClick={toggleModal} className='modal-title' id='modal'>{props.title}</div>
    </div>
  );
}

export {Modal};
