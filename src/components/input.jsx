import React from 'react';

class Input extends React.Component {
  render() {
    return (
      <div className={`c-form-group ${ this.props.addClass}`}>
        <input 
          id={this.props.id}
          className="c-form-group__input"
          placeholder={this.props.label}
          type={this.props.type}
          value={this.state.value}
          />
          <label 
            className="c-form-group__label"
            for={this.props.id}
          >
            {this.props.label}
          </label>
      </div>
    );
  }
}

  export default Input;
  