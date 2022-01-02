import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GeminiGameComponent from './view/gemini_game';

const level = window.location.hash.match(/[#&]level=(\d+)|/)[1]
const hook = document.querySelector('#gemini_game_container')
ReactDOM.render(<GeminiGameComponent level={level} />, hook)
