import React from 'react';
import { Nav, Col, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class SettingsSidebarMenu extends React.Component {
  render() {
    return (
      <Col sm={3} md={2} className="sidebar">
        <Nav className="nav-sidebar">
          <LinkContainer to="/settings/profile"><NavItem>My Profile</NavItem></LinkContainer>
          <LinkContainer to="/settings/communications"><NavItem>Communications</NavItem></LinkContainer>
        </Nav>
      </Col>
    );
  }
}

export default SettingsSidebarMenu;
