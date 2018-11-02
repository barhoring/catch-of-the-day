import React, { Component } from 'react';
import { formatPrice } from '../helpers.js';

class Order extends Component {
    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count =this.props.order[key];
        const isAvailable = fish.status === 'available';
        if(!isAvailable) {
            return <li key={key}> Sorry {fish ? fish.name: 'fish'} is not available</li>
        }
        return (
          <li key={key}>
            {count} lbs {fish.name}
            {formatPrice(count*fish.price)}
          </li>
        );
    }

    calcTotal = (orderIds) => {
        const { fishes, order } = this.props;
        const total = orderIds.reduce(
            (prevTotal , item) => {
                const fish = fishes[item];
                const count = order[item];
                const isAvailable = fish && fish.status === 'available';
                if(isAvailable) {
                    return prevTotal + count*fish.price;
                }
                return prevTotal;
        }, 0);
        return formatPrice(total);
    }
    render() {
        const orderIds = Object.keys(this.props.order);
        const total = this.calcTotal(orderIds);
        const { fishes } = this.props;
        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <ul className="order">
                    {orderIds.map(key => this.renderOrder(key))}
                </ul>
                <div className="total">
                    Total:
                    <strong>{total}</strong>
                </div>
            </div>
        );
    }
}

export default Order;