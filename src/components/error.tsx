import React from 'react';

interface propsInterface {
    message: string; 
}

const Error: React.FC<propsInterface> = (props) => {
  return (
    <small>{props.message}</small>
  );
}

export {Error};
