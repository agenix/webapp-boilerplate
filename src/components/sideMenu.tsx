import React, {useContext} from 'react';
import Context from './context';
import {translations} from '../translations/home';
import {Link} from 'react-router-dom';


const SideMenu: React.FC = (props) => {
  const { global } = useContext(Context) as {global: any; setGlobal: React.Dispatch<React.SetStateAction<any>>};
  const txt = translations[global.language];

  return (
    <div>
    <ul>
        <Link to={{pathname: '/my/identity'}}><li>Identity</li></Link>
        <Link to={{pathname: '/my/accounts'}}><li>Accounts</li></Link>
        <Link to={{pathname: '/my/claims'}}><li>Claims</li></Link>
    </ul>
      <hr/>
    <ul>
        <Link to={{pathname: '/my/profile'}}><li>Profile</li></Link>
        <Link to={{pathname: '/my/password'}}><li>Password</li></Link>
        <Link to={{pathname: '/my/settings'}}><li>Settings</li></Link>
        <Link to={{pathname: '/my/logout'}}><li>Log out</li></Link>
    </ul>
  </div>
  );
}

export {SideMenu};
