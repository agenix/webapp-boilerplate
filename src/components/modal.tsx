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
    if (event.target.id === 'form') return;
    modalState = !modalState;
    const modal = document.getElementById('modal');
    const form = document.getElementById('form');
    if (modal && form && modalState === true) {
      modal.style.display = "flex";
      modal.animate([{opacity: 0}, {opacity: 0.9}], 
        {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      form.animate([{transform: 'translateY(-200px)'}, {transform: 'translateY(0)'}], 
        {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
    }
    if (modal && form && modalState === false) {
      modal.animate([{opacity: 0.9}, {opacity: 0}], 
        {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      form.animate([{transform: 'translateY(0)'}, {transform: 'translateY(-200px)'}], 
        {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
        setTimeout(() => modal.style.display = "none", 200);
    }
  }

  return (
    <div>
      <div className='modal' id='modal' onClick={toggleModal}>
        <div className='close'>+</div>
        <div className='form' id='form'>form</div>
      </div>
      <div onClick={toggleModal} className='modal-title'>{props.title}</div>
    </div>
  );
}

export {Modal};
