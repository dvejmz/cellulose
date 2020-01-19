import React from 'react';

interface MakePaperButtonProps {
  onClick: () => void;
}

const MakePaperButton: React.FC<MakePaperButtonProps> = (props: MakePaperButtonProps) => (
  <div className="make-paper" data-test-id="make-paper-button">
    <button className="make-paper__button" onClick={props.onClick}>Make Paper</button>
  </div>
);

export default MakePaperButton;
