import React, {useContext} from 'react';
import Context from './context';
import {translations} from '../translations/home';
import { Menu } from './menu';
import { Header } from './header';
import {Link} from 'react-router-dom';

const Layout: React.FC = (props) => {
  const { global } = useContext(Context) as {global: any; setGlobal: React.Dispatch<React.SetStateAction<any>>};
  const txt = translations[global.language];
  let menuState = false;
  
  function toggleMenu() {
    menuState = !menuState;
    const layout = document.getElementById('layout');
    const cover = document.getElementById('cover');

    if (layout && cover && menuState === true) {
      cover.style.display = "block";
      layout.animate([{transform: 'translateX(0)'}, {transform: 'translateX(80vw)'}], 
      {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      cover.animate([{opacity: 0}, {opacity: 0.9}], 
      {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
    } else if (layout && cover && menuState === false) {
      layout.animate([{transform: 'translateX(80vw)'}, {transform: 'translateX(0)'}], 
      {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      cover.animate([{opacity: 0.9}, {opacity: 0}], 
        {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      setTimeout(() => { 
        cover.style.display = "none";
       }, 200);
      
    }
  }

  window.addEventListener("resize", () => {
    const browserWidth = document.documentElement.clientWidth;
   if(browserWidth >= 800 && menuState === true) {
    toggleMenu()
   };
  });

  return (
    <div className='screen'>
      <main className="layout" id="layout">
        {global.confirmEmail &&<section className='email'>{txt.pleaseConfirmEmail} <Link to={{pathname: '/profile'}}>{txt.updateYourEmail}</Link> {txt.or} <span>{txt.resendConfirmation}</span></section>}
        <section className='menu'><Menu toggleMenu={toggleMenu}/></section>
        <section className='header'><Header toggleMenu={toggleMenu}/></section>
        <section className='cover' id='cover' onClick={toggleMenu}></section>
        <section className='body'>{props.children}</section>
      </main>
    </div>
  );
}

export {Layout};
