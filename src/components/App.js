import React, { Component } from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes.js';

class App extends Component {
    state = {
        fishes: {},
        order: {},
    };
    addFish = (fish) => {
        console.log('adding a fish');
        this.setState(
            ({fishes}) => {
                fishes[`fish${Date.now()}`] = fish; 
                return { fishes };
            },
            ()=> console.log('added fish')
        );
    }
    addToOrder = (fish) => {
        this.setState(
            ({ order }) => {
                order[fish] = order[fish] + 1 || 1;
                return { order: order }
            },
            () => console.log(`added ${fish} to order`)
        );
    }
    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes});
    };
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                    {
                        Object.keys(this.state.fishes).map((key) => {
                            return (
                                <Fish
                                    key={key}
                                    index={key}
                                    details={sampleFishes[key]}
                                    addToOrder={this.addToOrder}
                                />
                            )
                        })
                    }
                    </ul>
                </div>
                <Order />
                <Inventory
                    addFish={this.addFish}
                    loadSampleFishes={this.loadSampleFishes}
                 />
            </div>
        );
    }
}

export default App;