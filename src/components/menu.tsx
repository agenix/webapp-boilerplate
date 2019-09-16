import React, {useContext} from 'react';
import Context from './context';
import {translations} from '../translations/home';
import {Link} from 'react-router-dom';

interface propsInterface {
    toggleMenu: (event: any) => void
 }

const Menu: React.FC<propsInterface> = (props) => {
  const { global } = useContext(Context) as {global: any; setGlobal: React.Dispatch<React.SetStateAction<any>>};
  const txt = translations[global.language];

  return (
    <div className='items'>
      <div className='close' onClick={props.toggleMenu}>+</div>      
        <div className='title'>{txt.aboutWorbli}</div>
          <div className='item' id='team' onClick={props.toggleMenu}><Link to={{pathname: '/team'}}>{txt.theTeam}</Link></div>
          <div className='item' id='foundation' onClick={props.toggleMenu}><Link to={{pathname: '/foundation'}}>{txt.theFoundation}</Link></div>
          <div className='item' id='press' onClick={props.toggleMenu}><Link to={{pathname: '/press'}}>{txt.pressReleases}</Link></div>
          <div className='item' id='contact' onClick={props.toggleMenu}><Link to={{pathname: '/contact'}}>{txt.contactUs}</Link></div>
          <div className='item' id='direction' onClick={props.toggleMenu}><Link to={{pathname: '/direction'}}>{txt.directionAim}</Link></div>
          <div className='item' id='differences' onClick={props.toggleMenu}><Link to={{pathname: '/differences'}}>{txt.keyDifferences}</Link></div>
          <div className='item' id='compliance' onClick={props.toggleMenu}><Link to={{pathname: '/compliance'}}>{txt.governanceCompliance}</Link></div>
        <div className='title'>{txt.getInvolved}</div>
          <div className='item' id='launch' onClick={props.toggleMenu}><Link to={{pathname: '/launch'}}>{txt.launchOnWorbli}</Link></div>
          <div className='item' id='partner' onClick={props.toggleMenu}><Link to={{pathname: '/partner'}}>{txt.partnerWithUs}</Link></div>
          <div className='item' id='account' onClick={props.toggleMenu}><Link to={{pathname: '/account'}}>{txt.openAnAccount}</Link></div>
        <div className='title'>{txt.progress}</div>
          <div className='item' id='updates' onClick={props.toggleMenu}><Link to={{pathname: '/updates'}}>{txt.latestUpdates}</Link></div>
          <div className='item' id='launches' onClick={props.toggleMenu}><Link to={{pathname: '/launches'}}>{txt.applicationLaunches}</Link></div>
          <div className='item' id='technical' onClick={props.toggleMenu}><Link to={{pathname: '/technical'}}>{txt.technicalUpdates}</Link></div>
      <div className='title'>{txt.joinWorbli}</div>
    </div>
  );
}

export {Menu};
