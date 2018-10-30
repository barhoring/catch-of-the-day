import React, { Component } from 'react';
import StorePicker from './StorePicker';

class App extends Component {
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header />
                </div>
                <Inventory />
                <Order />
            </div>
        );
    }
}

export default App;