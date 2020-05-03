import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'

class AppRoot extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Router>
                <Routes />
            </Router>
        );
    }
}

export default AppRoot;