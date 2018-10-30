import React, { Component } from 'react';
import { render } from 'react-dom';
import StorePicker from './components/StorePicker';
import './css/style.css';

// lets mount our app inside div:#main
render(<StorePicker />, document.querySelector('#main'));
// render(<h1>Hello</h1>, document.querySelector('#main'));

export default StorePicker;