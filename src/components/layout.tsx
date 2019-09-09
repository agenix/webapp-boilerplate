import React, {useState} from 'react';
import { Menu } from './menu';
import { Header } from './header';
import { Warning } from './warning';

const Layout: React.FC = (props) => {
  const [state, setState] = useState({menuState: false}); 

  function toggleMenu() {
    const layout = document.getElementById('layout');
    const cover = document.getElementById('cover');

    setState({ menuState: !state.menuState});

    if (layout && cover && state.menuState === false ) {
      cover.style.display = "block";
      layout.animate([{transform: 'translateX(0)'}, {transform: 'translateX(80vw)'}], 
      {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      cover.animate([{opacity: 0}, {opacity: 0.9}], 
      {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      
    } 
    else if (layout && cover && state.menuState === true) {
      layout.animate([{transform: 'translateX(80vw)'}, {transform: 'translateX(0)'}], 
      {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      cover.animate([{opacity: 0.9}, {opacity: 0}], 
        {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      setTimeout(() => { 
        cover.style.display = "none";
       }, 200);
    }

  }


  return (
    <div className='screen'>
      <main className="layout" id="layout">
        <section className='warning'><Warning/></section>
        <section className='menu'><Menu toggleMenu={toggleMenu}/></section>
        <section className='header'><Header toggleMenu={toggleMenu}/></section>
        <section className='cover' id='cover' onClick={toggleMenu}></section>
        <section className='body'>{props.children}</section>
      </main>
    </div>
  );
}

export {Layout};
