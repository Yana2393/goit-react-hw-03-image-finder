import React from "react";
import css from './ImageGallery.module.css'

function ImageGallery (props) {

    return <ul className={css.gallery}>{props.children}</ul>;
}

export default ImageGallery;