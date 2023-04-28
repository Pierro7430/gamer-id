import React from 'react';

class Button extends React.Component {
    render() {
      return (
        <button 
          type={this.props.type} 
          className={`btn btn--glitch ${ this.props.addClass}`}
          onClick={ this.props.onClick }
        >
          {this.props.content}
        </button>
      );
    }
  }

  export default Button;
  