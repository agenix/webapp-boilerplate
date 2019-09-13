import React, {useState, useContext, useEffect} from 'react';
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

  useEffect(() => {
    const screen = document.getElementById('layout-screen');
    const fixed = document.getElementById('layout-fixed');
    const sidenav = document.getElementById('sidenav');
    const nav = document.getElementById('nav');
    const body = document.getElementById('layout-body');
    const currentFolder = props.location.pathname.split('/')[1];
    const windowWidth = window.innerWidth;

    function imScrolling() {
      // sets the shaddow when scrolling down
      if (screen) {
        const scrollPosition = screen.scrollTop / 200;
        const rounded = Math.round( scrollPosition * 10 ) / 10
        if (scrollPosition < 100 && rounded < 0.9) {
          if (fixed) fixed.style["boxShadow"] = `0 0 2px rgba(0,0,0,${rounded})`;
          if (nav) nav.style["boxShadow"] = `0 1px 2px rgba(0,0,0,${rounded})`;
        }
      }
    }

    function displayWindowSize() {
      // redirect to home page if not logged in
      const jwtToken = localStorage.getItem("jwtToken");
      const goToHome = document.getElementById('goToHome');
      if (currentFolder === 'my' && !jwtToken) {
        if (localStorage.length > 0 ) {
          localStorage.clear();
        } 
        if (goToHome) goToHome.click()
      }
      
      // if we are in the my folder show the side nav, if we are not then hide it
      if (currentFolder !== 'my') {
        if (sidenav) sidenav.style.display = 'none';
        if (body) {
          body.style.display = 'block';
          body.style.paddingLeft = '0px';
          body.style.paddingRight = '0px';
        }
      } else if (currentFolder === 'my') {
        if (sidenav) sidenav.style.display = 'block';
      }

      // if we are in the my folder and the page is > 800 move the page over to the left so we can see the nav
      if(currentFolder === 'my' && windowWidth > 800) {
        const page = document.getElementById('page');
        if (page) page.style.left = '275px';
      }

      // if the window is less than 800 move the page back to the left
      if (windowWidth < 800)  {
        const page = document.getElementById('page');
        if (page) page.style.left = '0px';
      }

      // if the window > than 800 set the mody to be the same height as the page
      if (windowWidth > 800) {
        const page = document.getElementById('page');
        const footer = document.getElementById('layout-footer');
        const body = document.getElementById('layout-body');
        if (page && footer && body) {
          const rect = page.getBoundingClientRect();
          body.style.height = `${rect.height +65}px`;
        }
      }  
    }
    displayWindowSize();
    window.addEventListener("resize", displayWindowSize);
    window.addEventListener("scroll", imScrolling, true);

  }, [props.location, global.warning])


  useEffect(() => {
    const windowWidth = window.innerWidth;
    const body = document.getElementById('layout-body');
    const footer = document.getElementById('layout-footer');
    if (windowWidth > 800 && global.warning && body) {
        body.animate([{transform: 'translateY(0)'}, {transform: 'translateY(42px)'}], 
        {duration: 500, easing: 'ease-in-out', fill: 'forwards'});
    } else if (windowWidth > 800 && body && footer) {
        body.animate([{transform: 'translateY(42px)'}, {transform: 'translateY(0)'}], 
        {duration: 0, easing: 'ease-in-out', fill: 'forwards'});
      }
    if (windowWidth > 800 && global.warning && footer) {
        footer.animate([{transform: 'translateY(0)'}, {transform: 'translateY(42px)'}], 
        {duration: 500, easing: 'ease-in-out', fill: 'forwards'});
    } else if (windowWidth > 800 && footer) {
        footer.animate([{transform: 'translateY(42px)'}, {transform: 'translateY(0)'}], 
        {duration: 0, easing: 'ease-in-out', fill: 'forwards'});
      }

  }, [global.warning])


  function toggleMenu() {
    const layout = document.getElementById('layout');
    const cover = document.getElementById('layout-cover');
    
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
    <div className='screen' id='layout-screen'>
      <main className="layout" id="layout">
        <div className='fixed' id='layout-fixed'>
          <section className='warning' id='layout-warning'><Warning/></section>
          <section className='header'><Header toggleMenu={toggleMenu}/></section>
          <div className='sidenav' id='sidenav'><SideMenu location={props.location}/></div>
        </div>
        <section className='menu'><Menu toggleMenu={toggleMenu}/></section>
        <section className='cover' id='layout-cover' onClick={toggleMenu}></section>
        
        <section className='body' id='layout-body'>
          {props.children}
        </section>
        
        {!global.loggedIn &&
        <section className='footer' id='layout-footer'><Footer/></section>
        }
      </main>
      <Link id='goToHome' to={{pathname: '/'}} className='hidden'/>
    </div>
  );
}

export {Layout};
