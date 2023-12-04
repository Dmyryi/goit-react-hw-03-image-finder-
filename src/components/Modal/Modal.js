import React, { Component } from 'react';
import styles from './Modal.module.css'

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClose = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { imageUrl } = this.props;

    return (
      <div className={styles.overlay} onClick={this.handleClose}>
        <div className={styles.modal}>
          <img src={imageUrl} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
