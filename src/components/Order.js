import React, { Component } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers.js";

class Order extends Component {
  static propTypes = {
    fishes: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    removeFromOrder: PropTypes.func.isRequired
  };
  renderOrder = key => {
    const fish = this.props.fishes[key];
    // make sure thr fish is loaded before we continue
    if (!fish) return null;
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === "available";
    const transitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 250, exit: 250 }
    };
    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}> Sorry {fish ? fish.name : "fish"} is not available</li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 350, exit: 350 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
            <button onClick={() => this.props.removeFromOrder(key)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  };

  calcTotal = orderIds => {
    const { fishes, order } = this.props;
    const total = orderIds.reduce((prevTotal, item) => {
      const fish = fishes[item];
      const count = order[item];
      const isAvailable = fish && fish.status === "available";
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);
    return formatPrice(total);
  };
  render() {
    const orderIds = Object.keys(this.props.order);
    const total = this.calcTotal(orderIds);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(key => this.renderOrder(key))}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{total}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
