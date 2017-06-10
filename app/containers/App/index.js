/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Helmet from 'react-helmet';
import AppHeader from 'components/AppHeader';
import AppFooter from 'components/AppFooter';

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div>
        <Helmet
          titleTemplate="%s - GCD"
          defaultTitle="Global Coindex"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application' },
          ]}
        />
        {React.Children.toArray(this.props.children)}


      </div>
    );
  }
}
