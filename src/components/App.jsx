import { Component } from 'react';
import PropTypes from 'prop-types';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import getImages from './services/getImages';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    photos: [],
    loading: false,
    error: false,
    largeImage: undefined,
    showBtn: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loading: true });
      getImages(query, page)
        .then(({ hits: photos, totalHits: total_results }) => {
          if (!photos.length) {
            this.setState({ isEmpty: true, showBtn: false });
            alert('Bad request');
            return;
          }
          this.setState(prevState => ({
            photos: [...prevState.photos, ...photos],
            showBtn: page < Math.ceil(total_results / 15),
          }));
        })
        .catch(error => {
          this.setState({ error: error.message });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  onSubmit = query => {
    if (this.state.query === query) {
      alert('Already shown');
      return;
    }
    this.setState({
      query,
      page: 1,
      photos: [],
      showBtn: false,
      isEmpty: false,
      error: '',
      loading: true,
    });
  };

  handleClick = () => {
    this.setState(prev => ({
      page: prev.page + 1,
      loading: true,
    }));
  };

  handleImageClick = largeImage => {
    this.setState({
      largeImage,
    });
  };

  handleClose = () => {
    this.setState({
      largeImage: undefined,
    });
  };

  render() {
    const { photos, loading, largeImage, showBtn } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery>
          {photos.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem key={id} webformatURL={webformatURL} largeImageURL={largeImageURL} handleImageClick={this.handleImageClick} />
          ))}
        </ImageGallery>
        {largeImage && <Modal largeImage={largeImage} modalClose={this.handleClose} />}
        {loading && <Loader />}
        {showBtn && <Button handleClick={this.handleClick} />}
      </div>
    );
  }
}

App.propTypes = {
  onSubmit: PropTypes.func,
};
