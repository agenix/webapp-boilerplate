import React from 'react';
import { Menu } from './menu';
import { Header } from './header';
import { Footer } from './footer';

const Layout: React.FC = (props) => {
  let menuState = false;
  
  function toggleMenu() {
    menuState = !menuState;
    const layout = document.getElementById('layout');
    const cover = document.getElementById('cover');

    if (layout && cover && menuState === true) {
      cover.style.display = "block";
      layout.animate([{transform: 'translateX(0)'}, {transform: 'translateX(-80vw)'}], 
      {duration: 300, easing: 'ease-in-out', fill: 'forwards'});
      cover.animate([{opacity: 0}, {opacity: 0.9}], 
      {duration: 300, easing: 'ease-in-out', fill: 'forwards'});
    } else if (layout && cover && menuState === false) {
      layout.animate([{transform: 'translateX(-80vw)'}, {transform: 'translateX(0)'}], 
      {duration: 300, easing: 'ease-in-out', fill: 'forwards'});
      cover.animate([{opacity: 0.9}, {opacity: 0}], 
        {duration: 300, easing: 'ease-in-out', fill: 'forwards'});
      setTimeout(() => { 
        cover.style.display = "none";
       }, 300);
      
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
        <section className='menu'><Menu toggleMenu={toggleMenu}/></section>
        <section className='header'><Header toggleMenu={toggleMenu}/></section>
        <section className='cover' id='cover' onClick={toggleMenu}></section>
        <section className='body'>{props.children}</section>
        <section className='footer'><Footer/></section>
      </main>
    </div>
  );
}

export {Layout};
