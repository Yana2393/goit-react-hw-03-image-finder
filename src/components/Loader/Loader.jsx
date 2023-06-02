import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import css from './Loader.module.css'

function Loader (){
    return (
      <div className={css.loader}>
        <InfinitySpin width="200" color="darkslateblue" />
      </div>
    );
}

export default Loader;
