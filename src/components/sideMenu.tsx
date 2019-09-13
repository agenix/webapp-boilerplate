import React, {useContext, useEffect, useState} from 'react';
import Context from './context';
import {translations} from '../translations/home';
import {Link} from 'react-router-dom';

interface propsInterface {
    location: any; 
  }

const SideMenu: React.FC<propsInterface> = (props) => {
  const { global } = useContext(Context) as {global: any; setGlobal: React.Dispatch<React.SetStateAction<any>>};
  const [state, setState] = useState({menuHistory: ['first']}); 
  const txt = translations[global.language];

  useEffect(() => {
    const location = props.location.pathname.split('/')[2];
    let arr = state.menuHistory
    arr.push(location);
    if (arr.length > 2) arr.shift()
    setState(state => ({menuHistory: arr}));
    const selected = document.getElementById(location);
    if (selected) selected.classList.add("nav-selected");
    const remove = document.getElementById(state.menuHistory[0]);
    if (remove) remove.classList.remove("nav-selected");
  }, [props.location])

  return (
    <div className='nav'>
        <Link to={{pathname: '/my/identity'}}><div id='identity'>Identity</div></Link>
        <Link to={{pathname: '/my/accounts'}}><div id='accounts'>Accounts</div></Link>
        <Link to={{pathname: '/my/claims'}}><div id='claims'>Claims</div></Link>
        <hr/>
        <Link to={{pathname: '/my/profile'}}><div id='profile'>Profile</div></Link>
        <Link to={{pathname: '/my/password'}}><div id='password'>Password</div></Link>
        <Link to={{pathname: '/my/settings'}}><div id='settings'>Settings</div></Link>
        <Link to={{pathname: '/my/logout'}}><div id='logout'>Log out</div></Link>
  </div>
  );
}

export {SideMenu};
