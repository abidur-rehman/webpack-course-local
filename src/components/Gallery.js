import React from 'react';
import '../sass/Gallery.sass';

const getBundle = () => {
    import('lodash').then(_ => {
        console.log('imported', _)
    })
}

const Gallery = () => {
    return (
        <div>
            <h1 onClick={getBundle}>Gallery</h1>
        </div>
    );
}

export default Gallery;