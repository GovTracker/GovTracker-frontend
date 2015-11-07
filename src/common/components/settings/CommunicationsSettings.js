import React from 'react';
import Helmet from 'react-helmet';

class CommunicationsSettings extends React.Component {
  render() {
    return (
      <div>
        <Helmet
          title="Change Communications Settings"
        />
        <p className="lead">Communications Settings</p>
      </div>
    );
  }
}

export default CommunicationsSettings;
