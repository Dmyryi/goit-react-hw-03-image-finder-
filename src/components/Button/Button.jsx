import React, { Component } from 'react';

class Button extends Component {
  render() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    return (
      <button className="Button" type="button" onClick={e => this.props.fn()}>
        Load more
      </button>
    );
  }
}

export default Button;
