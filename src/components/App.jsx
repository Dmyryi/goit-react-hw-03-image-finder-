import React, { Component } from 'react';

import { CirclesWithBar } from 'react-loader-spinner';
import styles from './App.module.css';
import Searchbar from './SearchBar/SearchBar';
import ImageGallery from './GalleryImage/ImageGallery';
import Button from './Button/Button';
import Modaling from './Modal/Modaling';
import { fetchImages } from '../api';

class App extends Component {
  state = {
    searchWords: '',
    images: [],
    showModal: false,
    modalImage: '',
    showLoader: false,
    loadMore: false,
    currentPage: 1,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchWords !== this.state.searchWords ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.loaderToggle(true);
      fetchImages(this.state.searchWords, this.state.currentPage)
        .then(response => {
          this.pushImagesToState(response);
          this.loaderToggle(false);
          this.setState(prevState => ({
            totalHits: response.data.totalHits,
            loadMore:
              prevState.currentPage < Math.ceil(response.data.totalHits / 12),
          }));
        })
        .catch(error => {
          console.error('Error fetching images:', error);
          this.loaderToggle(false);
        });
    }
  }

  // ... existing methods

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  pushImagesToState = response => {
    const imagesFromResponse = response.data.hits;
    console.log(response.data);
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

    event.target.reset();
  };

  loadMoreFn = () => {
    this.loaderToggle(true);
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
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

        {this.state.loadMore && <Button fn={this.loadMoreFn} />}
      </div>
    );
  }
}

export default App;
