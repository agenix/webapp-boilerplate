import React from 'react';

interface propsInterface {
    message: string; 
}

const Confirm: React.FC<propsInterface> = (props) => {
  return (
    <small>{props.message}</small>
  );
}

export {Confirm};
