import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { isLoaded as isAuthLoaded, load as loadAuth } from '../redux/actions/user.js';

@connect(state => ({ routerState: state.router }))
class App extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  static contextTypes = {
    store: PropTypes.object
  }

  static fetchData(getState, dispatch) {
    const promises = [];
    if (!isAuthLoaded(getState())) {
      promises.push(Promise.all(dispatch(loadAuth(true))));
    }
    return Promise.all(promises);
  }

  render() {
    return (
      <html lang="en">
        <head>
        </head>
        <body>
          <Helmet
            title="GovTracker"
            titleTemplate="%s - GovTracker"
            meta={[
              {"charset": "utf-8"},
              {"http-equiv": "X-UA-Compatible", "content": "IE=edge"},
              {"name": "viewport", "content": "width=device-width, initial-scale=1"}
            ]}
            link={[
              {"href": "/static/frontend/css/bootstrap.min.css", "rel": "stylesheet"},
              {"href": "/static/frontend/css/font-awesome.min.css", "rel": "stylesheet"},
              {"href": "/static/frontend/css/common.css", "rel": "stylesheet"}
            ]}
          />
          {this.props.children}
          <script src="/static/frontend/js/jquery-2.1.4.min.js"></script>
          <script src="/static/frontend/js/bootstrap.min.js"></script>
          <script src="/static/frontend/js/bundle.js"></script>
        </body>
      </html>
    );
  }
}

export default App;
