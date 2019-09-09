import React, {useContext, useEffect, useRef} from 'react';
import Context from '../components/context';
import {RouteComponentProps} from 'react-router-dom';
import {Link} from 'react-router-dom';

interface MyProps {
  confirmationCode: string,
}

const Confirm: React.FC<RouteComponentProps<MyProps>> = (props) => {
    const { global } = useContext(Context) as {global: any};
    const confirmationCode = props.match.params.confirmationCode;
    let linkToHome = useRef<HTMLDivElement>(null);
    useEffect(() => {
    async function checkConfirmationCode() {
      const response = await fetch(`${global.apiUrl}/user/confirm_email`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({confirmationCode})
      });
      if (response.status === 200) {
        localStorage.setItem("warning", 'confirmed');
        if (linkToHome.current) {
          linkToHome.current.click();
        }
      } else if (response.status === 400) {
        localStorage.setItem("warning", 'invalid');
        if (linkToHome.current) {
          linkToHome.current.click();
        }
      }
    }    
    if (confirmationCode) {
      checkConfirmationCode();
    }
  }, [confirmationCode, global.apiUrl])
  
  return (
    <div className='page'>
      <Link to={{pathname: '/'}}><div ref={linkToHome}>r</div></Link>
    </div>
  );
} 

export default Confirm;