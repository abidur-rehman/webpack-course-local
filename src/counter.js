import React, {Component} from 'react';
import styles from './main.sass';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const Fancy = styled('h1')`
    color: ${props => (props.wild ? "hotpink" : "gold")}
`

const red = '#f00'
const className = css`
    color: ${red}
    font-size: 13em
`

class Counter extends Component {
    constructor(props){
        super(props);
        this.state = {
            number : 0
        }
    }

    render() {
        const isWild = this.state.number % 2 === 0;
        return (
            <div className="App">
                <div className={styles.counter} onClick={()=>this.setState({number : this.state.number + 1})}>
                    <Fancy wild={isWild}>{this.state.number}</Fancy>
                </div>
            </div>
        );
    }
}

export default Counter;