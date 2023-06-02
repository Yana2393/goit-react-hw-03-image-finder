import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ webformatURL, largeImageURL, handleImageClick }) {
  return (
    <div className={css.galleryItem} onClick={() => handleImageClick(largeImageURL)}>
      <img src={webformatURL} alt="" className={css.galleryImg} />
    </div>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  handleImageClick: PropTypes.func
};

export default ImageGalleryItem;
