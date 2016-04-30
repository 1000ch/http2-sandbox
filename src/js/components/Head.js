import React from 'react';

class Head extends React.Component {
  static propTypes = {
    pageTitle : React.PropTypes.string
  };

  static defaultProps = {
    pageTitle : ''
  };

  render() {
    return (
      <head>
        <meta charSet="utf-8" />
        <title>{this.props.pageTitle}</title>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <link rel="stylesheet" href="/css/lib.min.css" />
        <link rel="stylesheet" href="/css/app.min.css" />
      </head>
    );
  }
}

export default Head;
