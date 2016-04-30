import React from 'react';
import { NavLink } from 'fluxible-router';

class Nav extends React.Component {
  static propTypes = {
    currentRoute : React.PropTypes.object,
    links        : React.PropTypes.object
  };

  static defaultProps = {
    currentRoute : {},
    links        : {}
  };

  render() {
    const selected = this.props.currentRoute;
    const links = this.props.links;

    const linkHTML = Object.keys(links).map((name) => {
      let className = '';
      let link = links[name];
      let activeStyle = { backgroundColor : '#eee' };

      if (selected && selected.name === name) {
        className = 'pure-menu-selected';
      }

      return (
        <li className={className} key={link.path}>
          <NavLink routeName={link.page} activeStyle={activeStyle}>
            {link.title}
          </NavLink>
        </li>
      );
    });

    return (
      <ul className="pure-menu pure-menu-open pure-menu-horizontal">
        {linkHTML}
      </ul>
    );
  }
}

export default Nav;
