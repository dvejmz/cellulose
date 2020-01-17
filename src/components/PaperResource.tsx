import React from 'react';

export default (props: { value: number }) => (
  <div className="resources__paper">
    <span>Paper: {props.value}</span>
  </div>
);

//class PaperResource extends React.Component {
//  constructor(props) {
//    super(props);
//  }
//  render() {
//    return (
//  <div className="resources__paper">
//    <span>Paper: {this.props.value}</span>
//  </div>
//    );
//  }
//}
//
//export default PaperResource;
