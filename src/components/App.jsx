import React, { Component } from 'react';

import { CirclesWithBar } from 'react-loader-spinner';
import styles from './App.module.css';
import Searchbar from './SearchBar/SearchBar';
import ImageGallery from './GalleryImage/ImageGallery';
import Button from './Button/Button';
import Modaling from './Modal/Modaling';
import { getImages } from '../api';

class App extends Component {
  state = {
    searchWords: '',
    images: [],
    showModal: false,
    modalImage: '',
    showLoader: false,
    currentPage: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchWords !== this.state.searchWords) {
      this.getImages(this.state.searchWords, this.state.currentPage);
    }
  }

  // ... existing methods

  getImages(words, page) {
    this.loaderToggle(true);
    getImages(words, page)
      .then(response => {
        this.pushImagesToState(response);
        this.loaderToggle(false);
        this.setState(prevState => ({
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        this.loaderToggle(false);
      });
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  pushImagesToState = response => {
    const imagesFromResponse = response.data.hits;
    let newSearchArray = [];
    newSearchArray = [...this.state.images, ...imagesFromResponse];
    this.setState(({ images }) => ({ images: newSearchArray }));
  };
  setModalImage = linkImg => {
    return this.setState(({ modalImage }) => ({ modalImage: linkImg }));
  };
  openLargeImage = linkImg => {
    this.setModalImage(linkImg);
    this.toggleModal();
  };

  loaderToggle = bool => {
    return this.setState(({ showLoader }) => ({ showLoader: bool }));
  };

  searchFormSubmit = event => {
    event.preventDefault();
    this.setState({
      searchWords: '',
      images: [],
      showModal: false,
      modalImage: '',
      currentPage: 1,
    });
    const searchWordsValue = event.target[1].value;

    this.setState({ searchWords: searchWordsValue });
    const page = 1;
    this.getImages(searchWordsValue, page);
    event.target.reset();
  };

  loadMoreFn = () => {
    this.loaderToggle(true);
    this.getImages(this.state.searchWords, this.state.currentPage);
  };
  render() {
    return (
      <div className={styles.App}>
        {this.state.showModal && (
          <Modaling
            closeFn={this.toggleModal}
            loader={this.loaderToggle}
            id="modal-root"
          >
            <img src={this.state.modalImage} alt="modal" />
          </Modaling>
        )}
        <Searchbar onSubmit={this.searchFormSubmit} />

        {this.state.searchWords !== '' && (
          <ImageGallery
            loader={this.loaderToggle}
            imagesArray={this.state.images}
            modalFn={this.openLargeImage}
          ></ImageGallery>
        )}
        {this.state.showLoader && (
          <CirclesWithBar
            className={styles.spin}
            type="Bars"
            color="#00BFFF"
            height={80}
            width={80}
          />
        )}
        {this.state.searchWords !== '' && <Button fn={this.loadMoreFn} />}
      </div>
    );
  }
}

export default App;
