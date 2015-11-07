import React from "react";
import { Input, Row, Col, FormControls } from "react-bootstrap";
import {reduxForm} from 'redux-form';
import { getValidationErrorProperties, validateProfileEditor as validate } from '../../../helpers/validationUtils';
import { submitUpdateUserProfile as updateUserProfile } from '../../../redux/actions/user';
import ButtonInput from '../../ButtonInput';

export const fields = ['first_name', 'last_name', 'username', 'email', 'current_password', 'new_password1', 'new_password2'];

const submit = cb => (values, dispatch) => {
  const valuesToSubmit = {};
  Object.keys(values).map(key => {
    if (values[key]) {
      valuesToSubmit[key] = values[key];
    }
  });
  return new Promise((resolve, reject) => {
    const callbackOnResolve = () => {
      cb();
      resolve();
    }
    dispatch(updateUserProfile(valuesToSubmit, callbackOnResolve, reject));
  })
};

@reduxForm({
  form: 'profileEditor',
  fields,
  validate
},
state => ({
  initialValues: state.user.get("user"),
  userState: state.user
})
)
class ProfileEditor extends React.Component {
  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    initializeForm: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired,
    formTitle: React.PropTypes.node
  }

  static defaultProps = {
    formTitle: "Profile Editor"
  }

  state = { saved: false }

  render() {
    const {
      fields: { first_name, last_name, username, email, current_password, new_password1, new_password2 },
      submitting,
      invalid,
      handleSubmit,
      resetForm,
      updateUserProfile,
      userState,
      formTitle
    } = this.props;
    const saved = userState.get('updateSaved', false);

    return (
      <form onSubmit={handleSubmit(submit(resetForm))}>
        <fieldset>
          <legend>{formTitle}</legend>
          <Row>
            <Col xs={12} sm={6}>
              <Input type="email" ref="email" label="E-mail Address" name="email" {...getValidationErrorProperties(email)} {...email} />
            </Col>
            <Col xs={12} sm={6}>
              <FormControls.Static type="text" ref="username" label="Username" name="username" {...getValidationErrorProperties(username)} {...username} />
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6}>
              <Input type="text" ref="first_name" label="First Name" name="first_name" {...getValidationErrorProperties(first_name)} {...first_name} />
            </Col>
            <Col xs={12} sm={6}>
              <Input type="text" ref="last_name" label="Last Name" name="last_name" {...getValidationErrorProperties(last_name)} {...last_name} />
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6}>
              <input type="password" ref="foilauto_current_password" name="foilauto_current_password" value="" className="hidden" />
              <Input type="password" ref="current_password" label="Current Password" name="current_password" placeholder="Enter current password" {...getValidationErrorProperties(current_password, true)} {...current_password} />
            </Col>
            <Col xs={12} sm={6}>
              <Input type="password" ref="new_password1" label="New Password" name="new_password1" placeholder="Enter new password" {...getValidationErrorProperties(new_password1, true)} {...new_password1} />
              <Input type="password" ref="new_password2" label="Re-enter New Password" name="new_password2" placeholder="Re-enter new password" {...getValidationErrorProperties(new_password2, true)} {...new_password2} />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={3} mdPush={3} mdOffset={6}>
              <ButtonInput type="submit" bsStyle={saved ? "success" : "primary"} block disabled={submitting || invalid} className="navbar-btn">
                {!submitting && !saved && <span><i className="fa fa-lg fa-fw fa-check"/> Save Changes</span>}
                {!submitting && saved && <span><i className="fa fa-lg fa-fw fa-check"/> Saved!</span>}
                {submitting && <span><i className="fa fa-lg fa-fw fa-spin fa-circle-o-notch"/> Saving...</span>}
              </ButtonInput>
            </Col>
            <Col xs={12} md={3} mdPull={3}>
              <ButtonInput type="button" block className="navbar-btn" onClick={resetForm}><i className="fa fa-lg fa-fw fa-refresh"/> Reset</ButtonInput>
            </Col>
          </Row>
        </fieldset>
      </form>
    );
  }
}

export default ProfileEditor;
