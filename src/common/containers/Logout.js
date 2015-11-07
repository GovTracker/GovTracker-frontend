import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Grid, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as userActions from '../redux/actions/user';

@connect(
  state => ({user: state.user}),
  userActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
  }
  static contextTypes = {
    history: PropTypes.object
  }
  componentDidMount() {
    this.props.logout();
    this.context.history.replaceState(null, '/login');
  }
  render() {
    return (
      <p className="lead">Logging out...</p>
    );
  }
}

