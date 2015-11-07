import React from "react";
import { Route, IndexRoute, Redirect } from "react-router";
import { App, Dashboard, SignedIn, SignedOut, Login, Logout, Settings, Content, ContentWithSidebar, MainContent } from "./containers";
import TopNavBar from "./components/TopNavBar";
import SettingsSidebarMenu from "./components/sidebar/SettingsSidebarMenu";
import ProfileSettings from "./components/settings/ProfileSettings";
import CommunicationsSettings from "./components/settings/CommunicationsSettings";
import { isLoaded as isAuthLoaded, load as loadAuth} from "./redux/actions/user";

export default store => {
  const requireAuth = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { user } = store.getState();
      const loggedIn = user.has("loggedIn") ? user.get("loggedIn") : false;
      if (!loggedIn) {
        replaceState(nextState, "/login", { next: nextState.location.pathname });
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      Promise.all(store.dispatch(loadAuth(true))).then(checkAuth);
    } else {
      checkAuth();
    }
  };
  return (
    <Route component={App}>
      <Route component={SignedOut}>
        <Route path="/login" component={Login} />
      </Route>
      <Route component={SignedIn} onEnter={requireAuth}>
        <Route components={{topbar: TopNavBar, content: MainContent}}>
          <Route path="/logout" component={Logout} />
          <Route component={ContentWithSidebar}>
            <Route path="/" components={{content: Content}}>
              <IndexRoute component={Dashboard} />
            </Route>
            <Route path="/settings" components={{sidebar: SettingsSidebarMenu, content: Content}}>
              <Route path="profile" component={ProfileSettings} />
              <Route path="communications" component={CommunicationsSettings} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
  );
};
