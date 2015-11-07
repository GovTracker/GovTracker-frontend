import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class MainContent extends React.Component {
  render() { 
    return (
      <div className="main-content">
        {this.props.children}
      </div>
    );
  }
}

class Content extends React.Component {
  render() { 
    return this.props.children;
  }
}

class ContentWithSidebar extends React.Component {
  render() {
    const { sidebar, content } = this.props;
    if (sidebar) {
      return (
        <Grid fluid>
          <Row>
            {sidebar}
            <Col sm={9} smOffset={3} md={10} mdOffset={2} className="main">
              {content}
            </Col>
          </Row>
        </Grid>
      );
    } else {
      return (
        <Grid fluid>
          <Row>
            <Col xs={12} className="main">
              {content}
            </Col>
          </Row>
        </Grid>
      );
    }
  }
}

export default {
  ContentWithSidebar,
  Content,
  MainContent
}
