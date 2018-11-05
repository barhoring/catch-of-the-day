import React, { Component } from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes.js';
import base from '../base';

class App extends Component {
    state = {
        fishes: {},
        order: {},
    };
    componentDidMount() {
        const { params } = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) })
        }
        console.log(localStorageRef);
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }
    componentDidUpdate() {
        console.log(this.state.order);
        const storeId = this.props.match.params.storeId;
        localStorage.setItem(storeId, JSON.stringify(this.state.order));
    }
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }
    addFish = (fish) => {
        this.setState(
            ({fishes}) => {
                fishes[`fish${Date.now()}`] = fish; 
                return { fishes };
            },
            ()=> console.log('added fish')
        );
    }

    updateFish = (key, fish) => {
        console.log(fish);
        this.setState(prevState => {
            const fishes = { ...prevState.fishes, [key]: fish }
            console.log(fishes);
            return { fishes };
        });
    };

    addToOrder = key => {
        // 1. take a copy of state
        const order = { ...this.state.order };
        // 2. Either add to the order, or update the number in our order
        order[key] = order[key] + 1 || 1;
        // 3. Call setState to update our state object
        this.setState({ order });
    };

    /* addToOrder = (fish) => {
        this.setState(
            ({ order }) => {
                order[fish] = order[fish] + 1 || 1;
                return { order: order }
            },
            () => console.log(`added ${fish} to order`)
        );
    } */

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
                        Object.keys(this.state.fishes).map((key) => (
                                <Fish
                                    key={key}
                                    index={key}
                                    details={this.state.fishes[key]}
                                    addToOrder={this.addToOrder}
                                />
                            )
                        )
                    }
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} />
                <Inventory
                    addFish={this.addFish}
                    loadSampleFishes={this.loadSampleFishes}
                    updateFish={this.updateFish}
                    fishes={this.state.fishes}
                 />
            </div>
        );
    }
}

export default App;