/**
 * This leverages Express to create and run the http server.
 * A Fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */

import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';
import serialize from 'serialize-javascript';
import { navigateAction } from 'fluxible-router';
import debugLib from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/server';
import app from './app';
import HTML from './components/HTML';
import { createElementWithContext } from 'fluxible-addons-react';

const debug = debugLib('isumi-web');

const server = express();
server.use('/public', express.static(path.join(__dirname, '/build')));
server.use(compression());
server.use(bodyParser.json());

server.use((request, response, next) => {
  const context = app.createContext();

  debug('Executing navigate action');
  context.getActionContext().executeAction(navigateAction, {
    url : request.url
  }, error => {
    if (error) {
      if (error.statusCode && error.statusCode === 404) {
        // Pass through to next middleware
        next();
      } else {
        next(error);
      }
      return;
    }

    const file = process.env.NODE_ENV === 'production' ? 'main.min.js' : 'main.js';
    const exposed = 'window.__CONTEXT__=' + serialize(app.dehydrate(context)) + ';';
    const html = ReactDOM.renderToString(createElementWithContext(context));

    const htmlElement = React.createElement(HTML, {
      file    : file,
      context : context.getComponentContext(),
      state   : exposed,
      html    : html
    });
    const markup = ReactDOM.renderToStaticMarkup(htmlElement);

    debug('Sending markup');
    response.type('html');
    response.write('<!DOCTYPE html>' + markup);
    response.end();
  });
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log('Application listening on port ' + port);

export default server;
