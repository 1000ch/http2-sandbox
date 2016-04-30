import React from 'react';
import Head from './Head';
import ApplicationStore from '../stores/ApplicationStore';

class Document extends React.Component {
  static propTypes = {
    context : React.PropTypes.object,
    html    : React.PropTypes.string,
    state   : React.PropTypes.string,
    appFile : React.PropTypes.string
  };

  static defaultProps = {
    context : {},
    html    : '',
    state   : '',
    appFile : ''
  };

  render() {
    const appStore = this.props.context.getStore(ApplicationStore);
    const pageTitle = appStore.getPageTitle();
    const html = this.props.html;

    return (
      <html>
        <Head pageTitle={pageTitle} />
        <body>
          <div id="app" className="Container" dangerouslySetInnerHTML={{ __html : html }}></div>
          <script dangerouslySetInnerHTML={{ __html : this.props.state }}></script>
          <script src={`/js/${this.props.appFile}`}></script>
        </body>
      </html>
    );
  }
}

export default Document;
