import React, {useContext} from 'react';
import Context from './context';
import {translations} from '../translations/home';
import {Link} from 'react-router-dom';

import logoDark from '../images/logoDark.svg';
import logoLight from '../images/logoLight.svg';
import menuDark from '../images/menuDark.svg';
import menuLight from '../images/menuLight.svg';

interface propsInterface {
    toggleMenu: (event: any) => void
 }

const Header: React.FC<propsInterface> = (props) => {
  const { global } = useContext(Context) as {global: any; setGlobal: React.Dispatch<React.SetStateAction<any>>};
  const txt = translations[global.language];

  return (
    <header>
    <div className="menuLogo"><Link to={{pathname: '/'}}><img src={global.darkMode ? logoDark : logoLight} alt={txt.worbliLogo}/></Link></div>
    <nav className="menuNav" onClick={props.toggleMenu}><img src={global.darkMode ? menuDark : menuLight} alt={txt.menu}/></nav>
    <nav className="textNav">
      <div><Link to={{pathname: '/about'}}>{txt.aboutWorbli}</Link></div>
      <div><Link to={{pathname: '/involved'}}>{txt.getInvolved}</Link></div>
      <div><Link to={{pathname: '/progress'}}>{txt.progress}</Link></div>
      <div><Link to={{pathname: '/who'}}>{txt.whoWeAre}s</Link></div>
      <div>{txt.portal}</div>
    </nav>
  </header>
  );
}

export {Header};

