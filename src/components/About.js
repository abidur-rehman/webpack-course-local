import React from 'react';

const About = (props) => {
    return (
        <div className="profile">
            <img src="../images/link.jpg"/>
            <h1>{props.heading}</h1>
            <div className="content">
                {props.content}
            </div>
        </div>
    );
}

export default About;