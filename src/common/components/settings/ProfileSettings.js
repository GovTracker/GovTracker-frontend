import React from 'react';
import Helmet from 'react-helmet';
import { Row, Col, Panel, Well } from 'react-bootstrap';
import ProfileEditor from './user/ProfileEditor';

class ProfileSettings extends React.Component {
  render() {
    return (
      <Row>
        <Helmet
          title="Change Profile Settings"
        />
        <Col xs={12}>
          <Well>
            <Row>
              <Col xs={12}>
                <ProfileEditor formTitle="Profile Settings" />
              </Col>
            </Row>
          </Well>
        </Col>
      </Row>
    );
  }
}

export default ProfileSettings;
