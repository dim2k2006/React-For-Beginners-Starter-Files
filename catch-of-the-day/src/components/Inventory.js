import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
    constructor() {
        super();
        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, key) {
        const fish = this.props.fishes[key];
        const updateFish = {
            ...fish,
            [event.target.name]: event.target.value
        };

        this.props.updateFish(key, updateFish);
    }

    renderInventory(key) {
        const fish = this.props.fishes[key];

        return (
            <div className="fish-edit" key={key}>
                <input type="text" placeholder="Fish Name" value={fish.name} onChange={(event) => this.handleChange(event, key)} />
                <input type="text" placeholder="Fish Price" value={fish.price} onChange={(event) => this.handleChange(event, key)} />
                <select value={fish.status} onChange={(event) => this.handleChange(event, key)}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea placeholder="Fish Desc" value={fish.desc} onChange={(event) => this.handleChange(event, key)}></textarea>
                <input type="text" placeholder="Fish Image" value={fish.image} onChange={(event) => this.handleChange(event, key)} />
            </div>
        )
    }

    render() {
        return (
            <div className="inventory">
                <h2>Inventory</h2>

                {
                    Object.keys(this.props.fishes).map(this.renderInventory)
                }

                <AddFishForm addFish={this.props.addFish} />

                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
        )
    }
}

export default Inventory;