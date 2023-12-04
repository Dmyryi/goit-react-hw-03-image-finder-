import React, { Component } from 'react'
import styles from './ImageGallery.module.css'

export default class ImageGalleryItem extends Component {
  render() {
    return (
        <>
            <li className={styles.gallery_item} onClick={() => this.props.onClick(this.props.image.largeImageURL)}>
    <img src={this.props.image.webformatURL} alt="" />
  </li>
</>
    )
  }
}
