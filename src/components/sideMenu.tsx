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
    if (arr[1] !== location)  {  
        arr.push(location);
        if (arr.length > 2) arr.shift()
        setState(state => ({menuHistory: arr}));
        const selected = document.getElementById(location);
        if (selected) selected.classList.add("nav-selected");
        const remove = document.getElementById(state.menuHistory[0]);
        if (remove) remove.classList.remove("nav-selected");
    }
  }, [props.location, state.menuHistory])

  return (
    <div className='nav' id='nav'>
        <Link to={{pathname: '/my/identity'}}><div id='identity'>{txt.identity}</div></Link>
        <Link to={{pathname: '/my/accounts'}}><div id='accounts'>{txt.accounts}</div></Link>
        <Link to={{pathname: '/my/claims'}}><div id='claims'>{txt.claims}</div></Link>
        <hr/>
        <Link to={{pathname: '/my/profile'}}><div id='profile'>{txt.profile}</div></Link>
        <Link to={{pathname: '/my/password'}}><div id='password'>{txt.password}</div></Link>
        <Link to={{pathname: '/my/settings'}}><div id='settings'>{txt.settings}</div></Link>
        <Link to={{pathname: '/my/logout'}}><div id='logout'>{txt.logout}</div></Link>
  </div>
  );
}

export {SideMenu};
