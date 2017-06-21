import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoginImg from './login.jpg';
import Img from './Img';
import { FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button, Grid, Row, Col } from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';
import { changeForm } from './actions';
import { loginRequest } from 'containers/App/actions';
import { makeSelectEmail, makeSelectPassword } from './selectors';
import { makeSelectLoggedIn } from 'containers/App/selectors';
import { fromJS } from 'immutable';


class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

	componentWillMount(){
		console.log('componentWillMount');
		if (this.props.loggedIn) {
      browserHistory.replace("/wallet")
		}
	}
	render() {
		return (
			<div >
        <Helmet
          title="Login"
          meta={[
            { name: 'description', content: 'Cryptocurrency trading platform' },
          ]}
        />

          <Row className="show-grid">
              <Col md={6} sm={12} lg={6}>
                <Img src={LoginImg} alt="GlobalCoinDex" />
              </Col>
              <Col md={6} sm={12} lg={6} style={{paddingTop: 200}}>
                <form className="form-horizontal" onSubmit={this._onSubmit.bind(this)}>
                      <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                          Email
                        </Col>
                        <Col sm={10}>
                          <FormControl  type="email" value={this.props.email} placeholder="Your email address" onChange={this._changeEmail.bind(this)}
                             autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
                        </Col>
                      </FormGroup>

                      <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                          Password
                        </Col>
                        <Col sm={10}>
                          <FormControl  type="password" value={this.props.password} placeholder="••••••••••"  onChange={this._changePassword.bind(this)} />
                        </Col>
                      </FormGroup>


                      <FormGroup>
                        <Col smOffset={2} sm={10}>
                          <Button type="submit">
                            Sign In
                          </Button>
                        </Col>
                      </FormGroup>
                    </form>
              </Col>
            </Row>

    </div>
		);
	}
	_changeEmail(evt) {
		var newState = fromJS({
			email: evt.target.value,
			password: this.props.password
		});
		this._emitChange(newState);
	}

	_changePassword(evt) {
		var newState = fromJS({
			email: this.props.email,
			password: evt.target.value
		});
		this._emitChange(newState);
	}

	_emitChange(newState) {
		this.props.onChangeForm(newState.get('email'), newState.get('password'));
	}

	_onSubmit(evt) {
		evt.preventDefault();
		console.log(this.props.email);
		this.props.onLogin(this.props.email, this.props.password);
	}
}

const mapStateToProps = createStructuredSelector({
	email: makeSelectEmail(),
	password: makeSelectPassword(),
	loggedIn: makeSelectLoggedIn(),
});

export function mapDispatchToProps(dispatch) {
	return {
		onChangeForm: (email, password) => dispatch(changeForm(email, password)),
		onLogin: (email, password) => {
			console.log('email, pass: ', email, password);
			dispatch(loginRequest({ email, password }));
		},
	};
}


// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
