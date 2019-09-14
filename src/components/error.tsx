import React from 'react';

interface propsInterface {
    message: string; 
}

const Error: React.FC<propsInterface> = (props) => {
  return (
    <small className='error'>{props.message}</small>
  );
}

export {Error};
