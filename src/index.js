import React from 'react';
import { render } from 'react-dom';
import Router from './components/Router';
import './css/style.css';

// lets mount our app inside div:#main
render(<Router />, document.querySelector('#main'));
// render(<h1>Hello</h1>, document.querySelector('#main'));
