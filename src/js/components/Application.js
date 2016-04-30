import React from 'react';
import Nav from './Nav';
import ApplicationStore from '../stores/ApplicationStore';
import { connectToStores, provideContext } from 'fluxible-addons-react';
import { handleHistory } from 'fluxible-router';
import pages from '../configs/routes';

class Application extends React.Component {
  static propTypes = {
    pageTitle    : React.PropTypes.string,
    currentRoute : React.PropTypes.shape({
      handler : React.PropTypes.func
    })
  };

  static defaultProps = {
    pageTitle    : '',
    currentRoute : {
      handler : {}
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.pageTitle === prevProps.pageTitle) {
      return;
    }

    document.title = this.props.pageTitle;
  }

  render() {
    const Handler = this.props.currentRoute.handler;

    return (
      <div>
        <Nav currentRoute={this.props.currentRoute} links={pages} />
        <Handler />
      </div>
    );
  }
}

export default provideContext(handleHistory(connectToStores(
  Application,
  [ApplicationStore],
  (context) => {
    return {
      pageTitle : context.getStore(ApplicationStore).getPageTitle()
    };
  }
)));
