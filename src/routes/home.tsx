import React, {useContext} from "react";
import Context from '../components/context';
import {translations} from '../translations/home';

import logoDark from '../images/logoDark.svg';
import logoLight from '../images/logoLight.svg';
import menuDark from '../images/menuDark.svg';
import menuLight from '../images/menuLight.svg';

const Home: React.FC = () => {
  const { global } = useContext(Context) as {global: any; setGlobal: React.Dispatch<React.SetStateAction<any>>};
  const txt = translations[global.language];
  let menuState = false;

  function toggleMenu() {
    menuState = !menuState;
    const home = document.getElementById('home');
    const menu = document.getElementById('menu');
    if (home && menu && menuState === true) {
      home.animate([{transform: 'translateX(0)', opacity: 1}, {transform: 'translateX(-300px)', opacity: 0.2}], 
      {duration: 300, easing: 'ease-in-out', fill: 'forwards'});
      menu.animate([{transform: 'translateX(0)'}, {transform: 'translateX(-300px)'}], 
      {duration: 300, easing: 'ease-in-out', fill: 'forwards'});
    } else if (home && menu && menuState === false) {
      home.animate([{transform: 'translateX(-300px)', opacity: 0.2}, {transform: 'translateX(0)', opacity: 1}], 
      {duration: 300, easing: 'ease-in-out', fill: 'forwards'});
      menu.animate([{transform: 'translateX(-300px)'}, {transform: 'translateX(0)'}], 
      {duration: 300, easing: 'ease-in-out', fill: 'forwards'});
    }
  }

  return (
    <div className='screen'>
      <aside className='menu' id='menu'>
        <div className='items'>
          <div className='title'>{txt.aboutWorbli}</div>
            <div className='item'>{txt.directionAim}</div>
            <div className='item'>{txt.keyDifferences}</div>
            <div className='item'>{txt.governanceCompliance}</div>
          <div className='title'>{txt.getInvolved}</div>
            <div className='item'>{txt.launchOnWorbli}</div>
            <div className='item'>{txt.partnerWithUs}</div>
            <div className='item'>{txt.openAnAccount}</div>
          <div className='title'>{txt.progress}</div>
            <div className='item'>{txt.latestUpdates}</div>
            <div className='item'>{txt.applicationLaunches}</div>
            <div className='item'>{txt.technicalUpdates}</div>
          <div className='title'>{txt.whoWeAre}</div>
            <div className='item'>{txt.theTeam}</div>
            <div className='item'>{txt.theFoundation}</div>
            <div className='item'>{txt.pressReleases}</div>
            <div className='item'>{txt.contactUs}</div>
          <div className='title'>{txt.portal}</div>
        </div>
      </aside>
      <main className="home" id="home">
        <section className="header">
          <header>
            <div className="menuLogo">
              <img src={global.darkMode ? logoDark : logoLight} alt={txt.worbliLogo}/>
            </div>
            <nav className="menuNav" onClick={toggleMenu}>
              <img src={global.darkMode ? menuDark : menuLight} alt={txt.menu}/>
            </nav>
            <nav className="textNav">
              <div>{txt.aboutWorbli}</div>
              <div>{txt.getInvolved}</div>
              <div>{txt.progress}</div>
              <div>{txt.whoWeAre}</div>
              <div>{txt.portal}</div>
            </nav>
          </header>
        </section>
      </main>
    </div>
  );

} 

export default Home;



    // <div className="home bg">
    //   <div className="home-grid">
        
    //     <header className="left-logo">
    //         <Link to={{pathname: '/state'}}>Global: {txt.language}</Link>
    //         <p>{txt.language}</p>
    //         <button onClick={() => setGlobal({...global, language: 'en'})}>English</button>
    //         <button onClick={() => setGlobal({...global, language: 'cn'})}>Chinese</button>
    //     </header>
    //     <section>
      
    //     </section>
    //     <footer className="home-footer">
    //       © 2019 Agenix LLC.
    //     </footer>

    //   </div>
    // </div>