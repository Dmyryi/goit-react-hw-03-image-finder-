import React, { Component } from 'react'
import ImageGalleryItem from './ImageGalleryItem'


export default class ImageGallery extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.images.map(image => (
            <ImageGalleryItem key={image.id} image={image} onClick ={this.props.onImageClick} />
          ))}
      </ul>
      </div>
    )
  }
}
