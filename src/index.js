import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GeminiGame from './gemini_game';

const hook = document.querySelector('#gemini_game_container')
ReactDOM.render(<GeminiGame {...hook.dataset} />, hook)
