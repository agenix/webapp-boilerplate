import React, {useState} from 'react';
import {Join} from './join';
import {Login} from './login';

interface propsInterface {
    title: string; 
}

const Modal: React.FC<propsInterface> = (props) => {
  const [state, setState] = useState({showLogin: props.title === "Join" ? false : true, modalState: true}); 
  function toggleLogin() {
    setState({...state, showLogin: !state.showLogin});
  }
  function toggleModal(event: any) {
    if (event.target.id !== `modal-${props.title}`) return;
    setState({...state, modalState: !state.modalState});
    const modal = document.getElementById(`modal-${props.title}`);
    const card = document.getElementById(`card-${props.title}`);
    if (modal && card && state.modalState === true) {
      modal.style.display = "flex";
      modal.animate([{backgroundColor: 'rgba(0, 0, 0, 0)'}, {backgroundColor: 'rgba(0, 0, 0, 0.6)'}], {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      card.animate([{opacity: 0}, {opacity: 1}], {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      card.animate([{transform: 'translateY(-200px)'}, {transform: 'translateY(0)'}], {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
    }
    if (modal && card && state.modalState === false) {
      modal.animate([{backgroundColor: 'rgba(0, 0, 0, 0.6)'}, {backgroundColor: 'rgba(0, 0, 0, 0)'}], {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      card.animate([{opacity: 1}, {opacity: 0}],{duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      card.animate([{transform: 'translateY(0)'}, {transform: 'translateY(-200px)'}], {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      setTimeout(() => modal.style.display = "none", 200);
    }
  }

  return (
    <div>
      <div className='modal' id={'modal-' + props.title} onClick={toggleModal}>
        <div className='card' id={'card-' + props.title}>
        {state.showLogin 
        ? <Login toggleLogin={toggleLogin} toggleModal={toggleModal}/> 
        : <Join toggleLogin={toggleLogin} toggleModal={toggleModal}/>}
        </div>
      </div>
      <div onClick={toggleModal} className='modal-title' id={'modal-' + props.title}> {props.title}</div>
    </div>
  );
}

export {Modal};
