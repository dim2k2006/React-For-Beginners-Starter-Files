import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
    constructor() {
        super();

        this.addFish = this.addFish.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);

        // getInitialState
        this.state = {
            fishes: {},
            order: {}
        }
    }

    componentWillMount() {
        // This runs right before the <App> is rendered
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });

        // Check if there is any order in localStorage
        const localStorageRef = localStorage.getItem(`order-${ this.props.params.storeId}`);

        if (localStorageRef) {

            // Update App's component order state
            this.setState({order: JSON.parse(localStorageRef)});

        }
    }

    componentWillUnMount() {
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
    }

    addFish(fish) {
        // update state
        const fishes = {...this.state.fishes};

        // add new fish
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;

        // set state
        this.setState({fishes});
    }

    updateFish(key,  updatedFish) {
        const fishes = {...this.state.fishes};

        fishes[key] = updatedFish;

        this.setState({fishes});
    }

    loadSamples() {
        this.setState({fishes: sampleFishes})
    }

    addToOrder(key) {
        const order = {...this.state.order};

        order[key] = order[key] + 1 || 1;

        this.setState({order});
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />

                    <ul className="list-of-fishes">
                        {
                            Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
                        }
                    </ul>
                </div>

                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    params={this.props.params}
                />

                <Inventory
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    loadSamples={this.loadSamples}
                    fishes={this.state.fishes}
                />
            </div>
        )
    }
}

export default App;