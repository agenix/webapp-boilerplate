import React from 'react';
import {Join} from './join';

interface propsInterface {
    title: string; 
}

const Modal: React.FC<propsInterface> = (props) => {
  let modalState = false;
  
  function toggleModal(event: any) {
    if (event.target.id !== 'modal') return;
    modalState = !modalState;
    const modal = document.getElementById('modal');
    const card = document.getElementById('card');
    if (modal && card && modalState === true) {
      modal.style.display = "flex";
      modal.animate([{backgroundColor: 'rgba(0, 0, 0, 0)'}, {backgroundColor: 'rgba(0, 0, 0, 0.6)'}], {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      card.animate([{opacity: 0}, {opacity: 1}], {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      card.animate([{transform: 'translateY(-200px)'}, {transform: 'translateY(0)'}], {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
    }
    if (modal && card && modalState === false) {
      modal.animate([{backgroundColor: 'rgba(0, 0, 0, 0.6)'}, {backgroundColor: 'rgba(0, 0, 0, 0)'}], {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      card.animate([{opacity: 1}, {opacity: 0}],{duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      card.animate([{transform: 'translateY(0)'}, {transform: 'translateY(-200px)'}], {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      setTimeout(() => modal.style.display = "none", 200);
    }
  }

  return (
    <div>
      <div className='modal' id='modal' onClick={toggleModal}>
        <div className='card' id='card'>
          <Join/>
        </div>
      </div>
      <div onClick={toggleModal} className='modal-title' id='modal'> {props.title}</div>
    </div>
  );
}

export {Modal};
