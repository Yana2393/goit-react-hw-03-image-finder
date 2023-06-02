import React from "react";
import PropTypes from 'prop-types';
import css from './Button.module.css';

function Button (props) {
        return (
            <div className={css.loadMore}>
                <button type="button" className={css.loadMoreButton} onClick={() => props.handleClick()}>
                Load more
                </button> 
            </div>  
        );
};

export default Button;

Button.propTypes = {  
    handleClick: PropTypes.func
 };