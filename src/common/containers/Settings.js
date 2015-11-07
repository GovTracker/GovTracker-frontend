import React from 'react';

class Settings extends React.Component {
  render() {
    console.log(this.props.children);
    return (
      <p className='lead'>Settings</p>
    );
  }
}

export default Settings;
