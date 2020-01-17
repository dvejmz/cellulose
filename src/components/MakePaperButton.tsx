import React from 'react';

export default (props: { onClick: () => void }) => (
  <div className="make-paper__button">
    <button onClick={props.onClick}>Make Paper</button>
  </div>
);
