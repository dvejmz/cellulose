import React from 'react';

interface MakePaperButtonProps {
  onClick: () => void;
}

const MakePaperButton: React.FC<MakePaperButtonProps> = (props: MakePaperButtonProps) => (
  <div className="make-paper">
    <button className="make-paper__button" onClick={props.onClick}>Make Paper</button>
  </div>
);

export default MakePaperButton;
