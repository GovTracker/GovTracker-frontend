import React from 'react';
import Helmet from 'react-helmet';
import { Row, Col } from 'react-bootstrap';

class Dashboard extends React.Component {
  render() {
    return (
      <Row>
        <Helmet
          title="Dashboard"
        />
        <Col xs={12}>
          <p className="lead">Dashboard</p>
        </Col>
      </Row>
    );
  }
}

export default Dashboard;
