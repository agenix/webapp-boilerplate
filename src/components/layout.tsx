import React, {useState, useContext, useEffect, useRef} from 'react';
import Context from './context';
import { Link } from 'react-router-dom';
import { Menu } from './menu';
import { Header } from './header';
import { Warning } from './warning';
import { Footer } from './footer';
import { SideMenu } from './sideMenu';


interface propsInterface {
  location: any; 
}

const Layout: React.FC<propsInterface> = (props) => {
  const { global } = useContext(Context) as {global: any};
  const [state, setState] = useState({menuState: false}); 

  let layoutScreen = useRef<HTMLDivElement>(null);
  let layoutFixed = useRef<HTMLDivElement>(null);
  let sidenav = useRef<HTMLDivElement>(null);
  let layoutBody = useRef<HTMLDivElement>(null);
  let layoutFooter = useRef<HTMLDivElement>(null);
  let layout = useRef<HTMLDivElement>(null);
  let layoutCover = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const nav = document.getElementById('nav');
    const currentFolder = props.location.pathname.split('/')[1];
    const windowWidth = window.innerWidth;
    const windowheight = window.innerHeight;

    function imScrolling() {
      if (layoutScreen.current) {
        const scrollPosition = layoutScreen.current.scrollTop / 200;
        const rounded = Math.round( scrollPosition * 10 ) / 10
        if (scrollPosition < 100 && rounded < 0.9) {
          if (layoutFixed.current) layoutFixed.current.style["boxShadow"] = `0 0 2px rgba(0,0,0,${rounded})`;
          if (nav) nav.style["boxShadow"] = `0 1px 2px rgba(0,0,0,${rounded})`;
        }
      }
    }

    function displayWindowSize() {
      const jwtToken = localStorage.getItem("jwtToken");
      const goToHome = document.getElementById('goToHome');
      if (currentFolder === 'my' && !jwtToken) {
        if (localStorage.length > 0 ) {
          localStorage.clear();
        } 
        if (goToHome) goToHome.click()
      }
      
      if (currentFolder !== 'my') {
        if (sidenav.current) sidenav.current.style.display = 'none';
        if (layoutBody.current) {
          layoutBody.current.style.display = 'block';
          layoutBody.current.style.paddingLeft = '0px';
          layoutBody.current.style.paddingRight = '0px';
        }
      } else if (currentFolder === 'my') {
        if (sidenav.current) sidenav.current.style.display = 'block';
      }

      if(currentFolder === 'my' && windowWidth > 800) {
        const page = document.getElementById('page');
        if (page) page.style.left = '275px';
      }

      if (windowWidth < 800)  {
        const page = document.getElementById('page');
        if (page) page.style.left = '0px';
      }

      if (windowWidth > 800) {
        const page = document.getElementById('page');
        if (page && layoutFooter.current && layoutBody.current) {
          const rect = page.getBoundingClientRect();
          if(rect.height > windowheight) layoutBody.current.style.height = `${rect.height +65}px`;
          else layoutBody.current.style.height = 'calc(100vh - 350px)';
        }
      }  
    }
    displayWindowSize();
    window.addEventListener("resize", displayWindowSize);
    window.addEventListener("scroll", imScrolling, true);

  }, [props.location, global.warning])


  useEffect(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth > 800 && global.warning && layoutBody.current) {
        layoutBody.current.animate([{transform: 'translateY(0)'}, {transform: 'translateY(42px)'}], 
        {duration: 500, easing: 'ease-in-out', fill: 'forwards'});
    } else if (windowWidth > 800 && layoutBody.current && layoutFooter.current) {
        layoutBody.current.animate([{transform: 'translateY(42px)'}, {transform: 'translateY(0)'}], 
        {duration: 0, easing: 'ease-in-out', fill: 'forwards'});
      }
    if (windowWidth > 800 && global.warning && layoutFooter.current) {
        layoutFooter.current.animate([{transform: 'translateY(0)'}, {transform: 'translateY(42px)'}], 
        {duration: 500, easing: 'ease-in-out', fill: 'forwards'});
    } else if (windowWidth > 800 && layoutFooter.current) {
        layoutFooter.current.animate([{transform: 'translateY(42px)'}, {transform: 'translateY(0)'}], 
        {duration: 0, easing: 'ease-in-out', fill: 'forwards'});
      }

  }, [global.warning])


  function toggleMenu() {    
    setState({ menuState: !state.menuState});
    if (layout.current && layoutCover.current && state.menuState === false ) {
      layoutCover.current.style.display = "block";
      layout.current.animate([{transform: 'translateX(0)'}, {transform: 'translateX(80vw)'}], 
      {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      layoutCover.current.animate([{opacity: 0}, {opacity: 0.9}], 
      {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
    } 
    else if (layout.current && layoutCover.current && state.menuState === true) {
      layout.current.animate([{transform: 'translateX(80vw)'}, {transform: 'translateX(0)'}], 
      {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      layoutCover.current.animate([{opacity: 0.9}, {opacity: 0}], 
        {duration: 200, easing: 'ease-in-out', fill: 'forwards'});
      setTimeout(() => { 
        if(layoutCover.current) layoutCover.current.style.display = "none";
       }, 200);
    }
  }

  return (
    <div className='screen' ref={layoutScreen}>
      <main className="layout" ref={layout}>
        <div className='fixed' ref={layoutFixed}>
          <section className='warning' id='layout-warning'><Warning/></section>
          <section className='header'><Header toggleMenu={toggleMenu}/></section>
          <div className='sidenav' ref={sidenav}><SideMenu location={props.location}/></div>
        </div>
        <section className='menu'><Menu toggleMenu={toggleMenu}/></section>
        <section className='cover' ref={layoutCover} onClick={toggleMenu}></section>
        <section className='body' ref={layoutBody}>{props.children}</section>
        {!global.loggedIn && <section className='footer' ref={layoutFooter}><Footer/></section>}
      </main>
      <Link id='goToHome' to={{pathname: '/'}} className='hidden'/>
    </div>
  );
}

export {Layout};
