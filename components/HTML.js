import React from 'react';
import ApplicationStore from '../stores/ApplicationStore';

class HTML extends React.Component {
  static propTypes = {
    context : React.PropTypes.object,
    html    : React.PropTypes.string,
    state   : React.PropTypes.string,
    file    : React.PropTypes.string
  };

  static defaultProps = {
    context : {},
    html    : '',
    state   : '',
    file    : ''
  };

  render() {
    const pageTitle = this.props.context.getStore(ApplicationStore).getPageTitle();
    const html = this.props.html;

    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>{pageTitle}</title>
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css" />
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html : html }}></div>
          <script dangerouslySetInnerHTML={{ __html : this.props.state }}></script>
          <script src={`/public/js/${this.props.file}`}></script>
        </body>
      </html>
    );
  }
}

export default HTML;
