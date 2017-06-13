import React from 'react';
import Helmet from 'react-helmet';
import AppHeader from 'components/AppHeader';
import AppFooter from 'components/AppFooter';
import withProgressBar from 'components/ProgressBar';

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

				<AppHeader />
				       {React.Children.toArray(this.props.children)}
				<AppFooter />


      </div>
		);
	}
}
