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
      getImages(query, page)
        .then(({ photos, total_results }) => {
          if (!photos.length) {
            this.setState({ isEmpty: true, loading:false, showBtn: false});
            return alert('Bad request');
          }
          this.setState(prevState => ({
            photos: [...prevState.photos, ...photos],
            showBtn: page < Math.ceil(total_results / 15),
            loading: false
          }));
        })
        .catch(error => {
          this.setState({
            error: error.message,
            loading: false
          });
        });
    }
  }

  onSubmit = query => {
    if (this.state.query === query) {
      return alert('Already shown');
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

  handleImageClick = src => {
    this.setState({
      largeImage: src.large,
    });
  };

  handleClose = () => {
    this.setState({
      largeImage: undefined,
    });
  };

  render() {
    const { photos, loading, largeImage, showBtn} = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery>
          {photos.map(({ id, src }) => (
            <ImageGalleryItem key={id} src={src} handleImageClick={this.handleImageClick} />
          ))}
        </ImageGallery>
        {largeImage && <Modal src={largeImage} modalClose={this.handleClose} />}
        {loading && <Loader />}
        {showBtn && <Button handleClick={this.handleClick} />}
      </div>
    );
  }
}

App.propTypes = {
  onSubmit: PropTypes.func,
  photos: PropTypes.array,
  loading: PropTypes.bool,
  largeImage: PropTypes.string,
  showBtn: PropTypes.bool,
};
