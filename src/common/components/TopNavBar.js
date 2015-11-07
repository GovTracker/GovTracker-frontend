import React from 'react';
import { Navbar, CollapsibleNav, Nav, NavBrand, Input, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class TopNavBar extends React.Component {
  render() {
    return (
      <Navbar toggleNavKey={0} fluid fixedTop inverse toggleButton={[<i className="fa fa-fw fa-lg fa-bars fa-icon-bar" key="icon-bar" />]}>
        <NavBrand>GovTracker</NavBrand>
        <CollapsibleNav eventKey={0}>
          <Nav navbar>
            <LinkContainer to="/"><NavItem eventKey={1}>Home</NavItem></LinkContainer>
            <LinkContainer to="/issues"><NavItem eventKey={2}>Issue Tracker</NavItem></LinkContainer>
            <LinkContainer to="/discussions"><NavItem eventKey={3}>Discussions</NavItem></LinkContainer>
          </Nav>
          <Nav navbar right>
            <LinkContainer to="/settings"><NavItem eventKey={4} className="navbar-collapse-separator"><span className="hidden-xs"><i className="fa fa-cog fa-lg fa-fw" /></span><span className="visible-xs"><i className="fa fa-cog fa-fw" />Settings</span></NavItem></LinkContainer>
            <LinkContainer to="/logout"><NavItem eventKey={5}><span className="hidden-xs"><i className="fa fa-sign-out fa-lg fa-fw" /></span><span className="visible-xs"><i className="fa fa-sign-out fa-fw" />Logout</span></NavItem></LinkContainer>
          </Nav>
        </CollapsibleNav>
      </Navbar>
    );
  }
}

export default TopNavBar;
