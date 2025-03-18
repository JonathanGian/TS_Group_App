// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import Login from "../Components/Login/Login";
import Overlay from "../Components/Overlay/Overlay";
import { useAuth } from "../Contexts/AuthContext";
import Register from "../Components/Register/Register";
import UploadEmails from "../Components/Font-BackComponents/UploadEmails";
import EmailStatus from "../Components/Font-BackComponents/EmailStatus";
const ProtectedRoute = ({
  children
}: {
  children: JSX.Element;
}) => {
  if (stryMutAct_9fa48("264")) {
    {}
  } else {
    stryCov_9fa48("264");
    const {
      loggedIn
    } = useAuth();
    return loggedIn ? children : <Login />;
  }
};
const routes: RouteObject[] = stryMutAct_9fa48("265") ? [] : (stryCov_9fa48("265"), [stryMutAct_9fa48("266") ? {} : (stryCov_9fa48("266"), {
  path: stryMutAct_9fa48("267") ? "" : (stryCov_9fa48("267"), "/"),
  element: <ProtectedRoute>
				<Overlay />
			</ProtectedRoute>
}), stryMutAct_9fa48("268") ? {} : (stryCov_9fa48("268"), {
  path: stryMutAct_9fa48("269") ? "" : (stryCov_9fa48("269"), "/login"),
  element: <ProtectedRoute>
				<Login />
			</ProtectedRoute>
}), stryMutAct_9fa48("270") ? {} : (stryCov_9fa48("270"), {
  path: stryMutAct_9fa48("271") ? "" : (stryCov_9fa48("271"), "/register"),
  element: <Register />
}), stryMutAct_9fa48("272") ? {} : (stryCov_9fa48("272"), {
  path: stryMutAct_9fa48("273") ? "" : (stryCov_9fa48("273"), "/upload-emails"),
  element: <ProtectedRoute>
				<UploadEmails />
			</ProtectedRoute>
}), stryMutAct_9fa48("274") ? {} : (stryCov_9fa48("274"), {
  path: stryMutAct_9fa48("275") ? "" : (stryCov_9fa48("275"), "/status"),
  element: <ProtectedRoute>
				<EmailStatus />
			</ProtectedRoute>
})]);
const createRoutes = stryMutAct_9fa48("276") ? () => undefined : (stryCov_9fa48("276"), (() => {
  const createRoutes = () => createBrowserRouter(routes);
  return createRoutes;
})());
export default createRoutes;