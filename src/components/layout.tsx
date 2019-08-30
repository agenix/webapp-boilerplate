import React from 'react';
import { Menu } from './menu';
import { Header } from './header';
import { Footer } from './footer';

const Layout: React.FC = (props) => {
  let menuState = false;
  
  function toggleMenu() {
    menuState = !menuState;
    const layout = document.getElementById('layout');
    if (layout && menuState === true) {
      layout.animate([{transform: 'translateX(0)'}, {transform: 'translateX(-300px)'}], 
      {duration: 300, easing: 'ease-in-out', fill: 'forwards'});
    } else if (layout && menuState === false) {
      layout.animate([{transform: 'translateX(-300px)'}, {transform: 'translateX(0)'}], 
      {duration: 300, easing: 'ease-in-out', fill: 'forwards'});
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
        <section>{props.children}</section>
        <section className='footer'><Footer/></section>
      </main>
    </div>
  );
}

export {Layout};
