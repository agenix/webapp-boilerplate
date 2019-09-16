import React, {useContext, useEffect, useRef} from 'react';
import Context from './context';
import {translations} from '../translations/home';
import {Link} from 'react-router-dom';

const Warning: React.FC = () => {
  const { global, setGlobal } = useContext(Context) as {global: any; setGlobal: React.Dispatch<React.SetStateAction<any>>};
  const txt = translations[global.language];

  let confirm = useRef<HTMLDivElement>(null);
  let resend = useRef<HTMLDivElement>(null);
  let invalid = useRef<HTMLDivElement>(null);
  let confirmed = useRef<HTMLDivElement>(null);
  let warningBar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (global.warning === '') {
      setTimeout(() => {
        const warning = localStorage.getItem("warning") || '';
        if(warning){
          setGlobal({...global, warning});
        }
        if(warningBar.current) {
          warningBar.current.animate([{height: '0px'}, {height: '42px'}], {duration: 500, easing: 'ease-in-out', fill: 'forwards'});
        }
      }, 3000);
    }
    
    
    if (confirm.current && invalid.current && confirmed.current && warningBar.current) {
      if (global.warning === 'confirm') {
        hideAll();
        warningBar.current.style.display = "flex";
        confirm.current.style.display = "block";
        confirm.current.animate([{opacity: 0}, {opacity: 1}], {duration: 500, easing: 'ease-in-out', fill: 'forwards'});
      } 
      else if (global.warning === 'invalid') {
        hideAll();
        warningBar.current.style.display = "flex";
        invalid.current.style.display = "block";
        invalid.current.animate([{opacity: 0}, {opacity: 1}], {duration: 500, easing: 'ease-in-out', fill: 'forwards'});
        localStorage.setItem("warning", 'confirm');
        setTimeout(() => {
            setGlobal({...global, warning: 'confirm'});
        }, 3000);
      } 
      else if (global.warning === 'confirmed') {
        warningBar.current.style.display = "flex";
        confirmed.current.style.display = "block";
        confirmed.current.animate([{opacity: 0}, {opacity: 1}], {duration: 500, easing: 'ease-in-out', fill: 'forwards'});
        localStorage.removeItem('warning');
        setTimeout(() => {
            setGlobal({...global, warning: ''});
        }, 3000);
      } else if (warningBar){
        warningBar.current.style.display = "none";
      }
    }
  }, [global, setGlobal])

  function hideAll() {
    if (confirm.current && invalid.current && confirmed.current && warningBar.current && resend.current){
      resend.current.style.display = "none";
      confirm.current.style.display = "none";
      invalid.current.style.display = "none";
      confirmed.current.style.display = "none";
    }
  }

  async function resendConfirmation () {
    hideAll();
    if (resend.current) {
      resend.current.style.display = "block";
      resend.current.animate([{opacity: 0}, {opacity: 1}], {duration: 500, easing: 'ease-in-out', fill: 'forwards'});
    }
    setTimeout(() => {
      hideAll();
      if (confirm.current) {
        confirm.current.style.display = "block";
        confirm.current.animate([{opacity: 0}, {opacity: 1}], {duration: 500, easing: 'ease-in-out', fill: 'forwards'});
      }
    }, 3000);
    const jwtToken = localStorage.getItem("jwtToken");
    const response = await fetch(`${global.apiUrl}/user/resend_email`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({jwtToken})
    });
    console.log(response)
  }

  return (
    <section className='warning-bar' ref={warningBar}>
      <div className='confirm-warning' ref={confirm}> {txt.pleaseConfirmEmail} <Link to={{pathname: '/my/profile'}}>{txt.updateYourEmail}</Link> {txt.or} <span onClick={resendConfirmation}>{txt.resendConfirmation}</span></div>
      <div className='invalid-warning' ref={invalid}> {txt.invalidConfirmationCode}</div>
      <div className='confirmed-warning' ref={confirmed}> {txt.emailConfirmed} </div>
      <div className='resend-warning' ref={resend}> {txt.resendEmail}</div>
    </section>
  );
  
}

export {Warning};
