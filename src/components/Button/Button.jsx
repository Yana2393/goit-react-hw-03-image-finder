import { Component } from "react";
import PropTypes from 'prop-types';
import css from './Button.module.css';

class Button extends Component {
    render() {
        return (
            <div className={css.loadMore}>
                <button type="button" className={css.loadMoreButton} onClick={() => this.props.handleClick()}>
                Load more
                </button> 
            </div>  
        );
    }
};

export default Button;
