import React, { Component } from 'react';
import styles from './ImageGallery.module.css';
class ImageGalleryItem extends Component {
  static defaultProps = { imageLink: ' ', imageAlt: ' ' };

  render() {
    return (
      <li className={styles.ImageGalleryItem}>
        <img
          onClick={e => {
            this.props.modalFn(e.target.attributes[2].value);
            console.log(e);
          }}
          src={this.props.imageLink}
          alt={this.props.imageAlt}
          data-large={this.props.largeImageURL}
          className={styles.ImageGalleryItem_image}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
