import React, { Component } from 'react';
import SearchBar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Buttons/Loader';
import Button from './Buttons/Button';
import styles from '../components/Searchbar/Searchbar.module.css';

export default class App extends Component {
  state = {
    images: [],
    search: '',
    page: 1,
    isLoading: false,
    showModal: false,
    selectedImage: '',
  };

  handleChange = event => {
    this.setState({ search: event.currentTarget.value });
  };

  handleFetch = () => {
    const { search, page } = this.state;

    this.setState({ isLoading: true });

    const apiKey = '22964676-aac3c7ed7126080ab92aa911f';

    fetch(
      `https://pixabay.com/api/?q=${search}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(data => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
        }));
      })
      .catch(error => console.error('Error fetching images:', error))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleSubmit = (event, query) => {
    event.preventDefault();
    this.setState({ page: 1, images: [] });
    this.handleFetch();
  };

  updatePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.handleFetch();
  };

  openModal = imageUrl => {
    this.setState({ showModal: true, selectedImage: imageUrl });
  };

  closeModal = () => {
    this.setState({ showModal: false, selectedImage: '' });
  };

  render() {
    const { images, isLoading, showModal, selectedImage } = this.state;
    return (
      <div>
        <header className={styles.searchbar}>
          <form onSubmit={this.handleSubmit} className={styles.form}>
            <button type="submit" className={styles.button}>
              <span>Search</span>
            </button>

            <input
              className="input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.search}
              onChange={this.handleChange}
            />
          </form>
        </header>

        <ImageGallery images={images} onImageClick={this.openModal} />

        {isLoading && <Loader />}

        {images.length > 0 && !isLoading && (
          <Button onLoadMore={this.updatePage} />
        )}

        {showModal && (
          <Modal imageUrl={selectedImage} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}
