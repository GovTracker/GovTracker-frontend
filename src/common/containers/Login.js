import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Grid, Col, Row } from 'react-bootstrap';
import LoginBox from '../components/LoginBox';

export default class Login extends Component {
  render() {
    return (
      <Grid fluid className="login-grid">
        <Helmet
          title="Login"
        />
        <div className="login-form-container">
          <LoginBox />
        </div>
      </Grid>
    );
  }
}
