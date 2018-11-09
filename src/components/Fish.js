import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers.js";

class Fish extends React.Component {
  static propTypes = {
    addToOrder: PropTypes.func,
    details: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      desc: PropTypes.string,
      price: PropTypes.number,
      status: PropTypes.string
    })
  };
  render() {
    const { image, name, price, desc, status } = this.props.details;
    const isAvailable = status === "available";
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {this.props.details.name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button
          disabled={!isAvailable}
          onClick={() => this.props.addToOrder(this.props.index)}
        >
          {isAvailable ? "Add To Order" : "Sold Out!"}
        </button>
      </li>
    );
  }
}

export default Fish;
