
import React from 'react';
import Helmet from 'react-helmet';

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
