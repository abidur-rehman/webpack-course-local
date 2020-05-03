import React from 'react';
import '../sass/About.sass';

const About = (props) => {
    return (
        <div className='profile'>
            <img src='../images/link.jpg'/>
            <h1>{props.heading}</h1>
            <div className='content'>
                counter {props.content}
            </div>
        </div>
    );
}

export default About;