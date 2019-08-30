import React from 'react';
import { SideMenu } from './side-menu';
import { Header } from './header';

const Layout: React.FC = (props) => {
  let menuState = false;
  
  function toggleMenu() {
    menuState = !menuState;
    const home = document.getElementById('home');
    if (home && menuState === true) {
      home.animate([{transform: 'translateX(0)'}, {transform: 'translateX(-300px)'}], 
      {duration: 300, easing: 'ease-in-out', fill: 'forwards'});
    } else if (home && menuState === false) {
      home.animate([{transform: 'translateX(-300px)'}, {transform: 'translateX(0)'}], 
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
    <div className='layout'>
      <main className="home" id="home">
        <section className="sideMenu"><SideMenu toggleMenu={toggleMenu}/></section>
        <section className="header"><Header toggleMenu={toggleMenu}/></section>
        <section className="body">{props.children}</section>
        <section className="footer">Footers</section>
      </main>
    </div>
  );
}

export {Layout};
