import React, {useContext} from 'react';
import Context from './context';
import {translations} from '../translations/home';
import {Link} from 'react-router-dom';



const Footer: React.FC = () => {
  const { global } = useContext(Context) as {global: any; setGlobal: React.Dispatch<React.SetStateAction<any>>};
  const txt = translations[global.language];

  return (
<div>Footer</div>
  );
}

export {Footer};
