import React, { Component } from 'react';

import GalleryImageItem from './GalleryImageItem';

class ImageGallery extends Component {
  componentDidMount() {
    this.props.loader(true);
  }

  render() {
    return (
      <ul className="ImageGallery">
        {this.props.imagesArray.map((image, idx) => {
          return (
            <GalleryImageItem
              key={image.id}
              imageLink={image.webformatURL}
              imagAlt={image.tags}
              largeImageURL={image.largeImageURL}
              modalFn={this.props.modalFn}
            />
          );
        })}
      </ul>
    );
  }
}

export default ImageGallery;
