import React, {Component} from 'react';

class AppRoot extends Component {
    constructor(props){
        super(props);
        this.state = {
            number : 0
        }
    }

    render() {
        const isWild = this.state.number % 2 === 0;
        return (
            <div className="profile">
                <img src="../images/link.jpg"/>
                <h1>{this.props.heading}</h1>
                <div className="content">
                    {this.props.content}
                </div>
            </div>
        );
    }
}

export default AppRoot;