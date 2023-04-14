import React from 'react';

class Input extends React.Component {
    render() {
      return (
        <button 
          type={this.props.type} 
          className={`btn btn--glitch ${ this.props.addClass}`}
          // onClick={onClick}
        >
          {this.props.content}
        </button>
      );
    }
  }

  export default Input;
  