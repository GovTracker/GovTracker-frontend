import React, { Component, PropTypes } from 'react';
import { Input, Button, Alert, Panel } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import { getValidationErrorProperties, validateLogin as validate } from '../helpers/validationUtils';
import * as userActions from '../redux/actions/user';
import ButtonInput from './ButtonInput';

export const fields = ['username', 'password'];

const submit = cb => (values, dispatch) => {
  return new Promise((resolve, reject) => {
    const callbackOnResolve = () => {
      cb();
      resolve();
    }
    const rejectFilter = error => {
      const non_field_errors = {};
      if (error.hasOwnProperty('non_field_errors')) {
        non_field_errors._error = error['non_field_errors'][0];
      }
      reject({
        ...non_field_errors,
        ...error
      })
      console.log({
        ...non_field_errors,
        ...error
      })
    }
    dispatch(userActions.login(values.username, values.password, callbackOnResolve, rejectFilter));
  })
};

@reduxForm({
  form: 'login',
  fields,
  validate
},
state => ({
  user: state.user,
  routerState: state.router
}),
userActions
)
export default class LoginBox extends Component {
  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    routerState: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    error: PropTypes.string
  }

  static contextTypes = {
    history: PropTypes.object
  }

  submitCallback = () => {
    const next = this.props.routerState.location.query.next || '/';
    this.context.history.pushState(null, next);
  }

  render() {
    const {
      fields: { username, password },
      submitting,
      invalid,
      handleSubmit,
      logout,
      login,
      error
    } = this.props;
    const loggedIn = this.props.user.has('loggedIn') ? this.props.user.get('loggedIn') : false;
    const user = this.props.user.get('user');

    if (!loggedIn) {
      const title = (
        <h2 className="form-login-heading">Login</h2>
      );
      return (
        <div className="form-login">
          <Panel header={title} bsStyle="primary">
            <form onSubmit={handleSubmit(submit(this.submitCallback))} >
              <Input type="username" placeholder="Username" label="Username" ref="username" name="username" labelClassName="sr-only" required autofocus {...getValidationErrorProperties(username, true)} {...username} /> 
              <Input type="password" placeholder="Password" label="Password" ref="password" name="password" labelClassName="sr-only" required {...getValidationErrorProperties(password, true)} {...password} /> 
              <ButtonInput type="submit" bsStyle="primary" bsSize="large" block disabled={submitting}>
                {!submitting && <span><i className="fa fa-lg fa-fw fa-sign-in"/> Login</span>}
                {submitting && <span><i className="fa fa-lg fa-fw fa-spin fa-circle-o-notch"/> Logging in...</span>}
              </ButtonInput>
            </form>
          </Panel>
          { error &&
            <Alert bsStyle="danger">{error}</Alert>
          }
        </div>
      );
    } else {
      const title = (
        <h2 className="form-login-heading">Logout</h2>
      );
      return (
        <div className="form-login">
          <Panel header={title} bsStyle="primary">
            <div className="text-center">
              <p> You are currently logged in as {user.username}. </p>
              <ButtonInput type="button" bsStyle="danger" bsSize="large" block onClick={logout}>
                <i className="fa fa-lg fa-fw fa-sign-out"/> Logout
              </ButtonInput>
            </div>
          </Panel>
        </div>
      );
    }
  }
}
