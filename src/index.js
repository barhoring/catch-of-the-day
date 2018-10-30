import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './components/App';
import './css/style.css';

// lets mount our app inside div:#main
render(<App />, document.querySelector('#main'));
// render(<h1>Hello</h1>, document.querySelector('#main'));
