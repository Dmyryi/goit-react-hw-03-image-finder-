import React, { Component } from 'react';
import styles from './Button.module.css';
class Button extends Component {
  render() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    return (
      <button
        className={styles.Button}
        type="button"
        onClick={e => this.props.fn()}
      >
        Load more
      </button>
    );
  }
}

export default Button;
