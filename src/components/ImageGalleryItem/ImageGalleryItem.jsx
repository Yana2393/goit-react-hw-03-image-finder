import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css'

class ImageGalleryItem extends Component {
  render() {
      const { src, handleImageClick } = this.props;

    return (
      <div className={css.galleryItem} onClick={() => handleImageClick(src)}>
        <img src={src.medium} alt="" className={css.galleryImg} />
      </div>
    );
  }
}

ImageGalleryItem.propTypes = {
  src: PropTypes.object,
  handleImageClick: PropTypes.func,
};

export default ImageGalleryItem;
