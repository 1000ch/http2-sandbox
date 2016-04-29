/*global document, window */

import ReactDOM from 'react-dom';
import debug from 'debug';
import { createElementWithContext } from 'fluxible-addons-react';
import app from './app';

const debugClient = debug('isumi-web');
const dehydratedState = window.__CONTEXT__; // Sent from the server

window.React = ReactDOM; // For chrome dev tool support

// expose debug object to browser, so that it can be enabled/disabled from browser:
// https://github.com/visionmedia/debug#browser-support
window.fluxibleDebug = debug;

debugClient('rehydrating app');

// pass in the dehydrated server state from server.js
app.rehydrate(dehydratedState, (error, context) => {
  if (error) {
    throw error;
  }

  window.context = context;
  const mountNode = document.getElementById('app');

  debugClient('React Rendering');
  ReactDOM.render(
    createElementWithContext(context),
    mountNode,
    () => debugClient('React Rendered')
  );
});
