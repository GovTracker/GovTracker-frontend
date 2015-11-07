import {List, Map} from 'immutable';
import {expect} from 'chai';

import * as userFunctions from '../src/user';

describe('application logic', () => {

  describe('user application logic', () => {

    describe('setLoggedIn', () => {

      it('sets user to logged in', () => {
        const user = Map({
          loggedIn: false,
          firstName: "Ritesh",
          lastName: "Patel",
          email: "xpatel@pulsecode.ca"
        });
        const loggedIn = true;
        const nextState = userFunctions.setLoggedIn(user, loggedIn);
        expect(nextState).to.equal(Map({
          loggedIn: true,
          firstName: "Ritesh",
          lastName: "Patel",
          email: "xpatel@pulsecode.ca"
        }));
        const loggedOut = false;
        const nextState2 = userFunctions.setLoggedIn(nextState, loggedOut);
        expect(nextState2).to.equal(Map({
          loggedIn: false,
          firstName: null,
          lastName: null,
          email: null
        }));
      });

    });

    describe('setFirstName', () => {

      it("sets user's first name", () => {
        const user = Map({
          loggedIn: true,
          firstName: "Ritesh",
          lastName: "Patel",
          email: "xpatel@pulsecode.ca"
        });
        const firstName = "Xitij";
        const nextState = userFunctions.setFirstName(user, firstName);
        expect(nextState).to.equal(Map({
          loggedIn: true,
          firstName: "Xitij",
          lastName: "Patel",
          email: "xpatel@pulsecode.ca"
        }));
      });

    });

    describe('setLastName', () => {

      it("sets user's last name", () => {
        const user = Map({
          loggedIn: true,
          firstName: "Ritesh",
          lastName: "Patel",
          email: "xpatel@pulsecode.ca"
        });
        const lastName = "Yhap";
        const nextState = userFunctions.setLastName(user, lastName);
        expect(nextState).to.equal(Map({
          loggedIn: true,
          firstName: "Ritesh",
          lastName: "Yhap",
          email: "xpatel@pulsecode.ca"
        }));
      });

    });

    describe('setEmail', () => {

      it("sets user's email", () => {
        const user = Map({
          loggedIn: true,
          firstName: "Ritesh",
          lastName: "Patel",
          email: "xpatel@pulsecode.ca"
        });
        const email = "xitij.patel@gmail.com";
        const nextState = userFunctions.setEmail(user, email);
        expect(nextState).to.equal(Map({
          loggedIn: true,
          firstName: "Ritesh",
          lastName: "Patel",
          email: "xitij.patel@gmail.com"
        }));
      });

    });

  });

});
