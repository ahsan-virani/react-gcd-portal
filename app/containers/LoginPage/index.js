import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';


class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <h1>
        Login page
        <input value={this.props.username} onChange={this.props.onChangeUsername} />
      </h1>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  // username: makeSelectUsername()
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value))
  };
}


// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
