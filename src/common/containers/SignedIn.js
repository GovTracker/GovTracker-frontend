import React from 'react';

class SignedIn extends React.Component {
  render() {
    return (
      <div>
        {this.props.topbar}
        {this.props.content}
      </div>
    );
  }
}

export default SignedIn;
