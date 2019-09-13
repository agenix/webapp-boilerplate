import React, {useContext} from 'react';
import Context from './context';
import {translations} from '../translations/home';
import {Link} from 'react-router-dom';
import logoDark from '../images/logoDark.svg';
import logoLight from '../images/logoLight.svg';

const Footer: React.FC = () => {
  const { global } = useContext(Context) as {global: any; setGlobal: React.Dispatch<React.SetStateAction<any>>};
  const txt = translations[global.language];

  return (
    <footer>
      <div className='area'>
        <div><Link to={{pathname: '/'}}><div className="footerLogo"><img src={global.darkMode ? logoDark : logoLight} alt={txt.worbliLogo}/></div></Link></div>
        <div>{txt.termsOfService}</div>
        <div>{txt.privacyPolicy}</div>
        <div className='copyright'>{txt.copyright}</div>
        <div>&nbsp;</div>
      </div>
      <div className='area'>
        <div className='title'>{txt.quickLinks}</div>
        <div>{txt.blockExplorer}</div>
        <div>{txt.exchanges}</div>
        <div>{txt.makeReport}</div>
        <div>{txt.blockProducerSheet}</div>
      </div>
      <div className='area'>
        <div className='title'>{txt.followUs}</div>
        <div>{txt.medium}</div>
        <div>{txt.twitter}</div>
        <div>{txt.facebook}</div>
        <div>{txt.youtube}</div>
      </div>
      <div className='area'>
        <div className='title'>{txt.contactUs}</div>
        <div>{txt.telegram}</div>
        <div>{txt.email}</div>
        <div className='fill'>&nbsp;</div>
        <div className='fill'>&nbsp;</div>
      </div>
    </footer>
  );
}

export {Footer};
