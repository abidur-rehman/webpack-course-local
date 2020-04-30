import React, {Component} from 'react';

class Counter extends Component {
    constructor(props){
        super(props);
        this.state = {
            number : 0
        }
    }

    render() {
        return (
            <div className="App">
                <p className="App-intro">
                    Will the state be preserved? This value is {this.state.number}
                </p>
                <button onClick={()=>this.setState({number : this.state.number + 1})}>+</button>
            </div>
        );
    }
}

export default Counter;