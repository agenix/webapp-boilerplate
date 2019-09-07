import React, {useContext} from 'react';
import Context from './context';
import {translations} from '../translations/home';
import {Link} from 'react-router-dom';
import {Modal} from '../components/modal';

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
      <nav className="menuNav" onClick={props.toggleMenu}><img src={global.darkMode ? menuDark : menuLight} alt={txt.menu}/></nav>
      <Link to={{pathname: '/'}}><div className="menuLogo"><img src={global.darkMode ? logoDark : logoLight} alt={txt.worbliLogo}/></div></Link>
      <nav className="textNav">
        <Link to={{pathname: '/about'}}><div>{txt.aboutWorbli}</div></Link>
        <Link to={{pathname: '/involved'}}><div>{txt.getInvolved}</div></Link>
        <Link to={{pathname: '/progress'}}><div>{txt.progress}</div></Link>
        <div className='loggedOut'>
          <div><Modal title='join'/></div>
          <div><Modal title='login'/></div>
        </div>

      </nav>
    </header>
  );
}

export {Header};
