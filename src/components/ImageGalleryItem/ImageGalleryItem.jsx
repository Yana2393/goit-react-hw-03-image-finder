import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css'

class ImageGalleryItem extends Component {
  render() {
      const { webformatURL, largeImageURL, handleImageClick } = this.props;

    return (
      <div className={css.galleryItem} onClick={() => handleImageClick(largeImageURL)}>
        <img src={webformatURL} alt="" className={css.galleryImg} />
      </div>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  handleImageClick: PropTypes.func
}

export default ImageGalleryItem;
