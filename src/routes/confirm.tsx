import React, {useContext} from 'react';
import Context from '../components/context';
import {RouteComponentProps} from 'react-router-dom';

interface MyProps {
  confirmationCode: string,
}

const Confirm: React.FC<RouteComponentProps<MyProps>> = (props) => {
  const { global } = useContext(Context) as {global: any};
  const confirmationCode = props.match.params.confirmationCode;

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
      window.location.href = '/';
    } else if (response.status === 400){
      localStorage.setItem("warning", 'invalid');
      window.location.href = '/';
    }
    
  }
  if (confirmationCode) {
    checkConfirmationCode();
  }



  return (
    <div className='page'>Confirm</div>
  );
} 

export default Confirm;