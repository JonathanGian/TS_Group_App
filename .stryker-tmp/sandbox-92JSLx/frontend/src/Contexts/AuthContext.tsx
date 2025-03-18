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
import React, { createContext, useContext, useState, ReactNode } from "react";
interface AuthContextType {
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  if (stryMutAct_9fa48("242")) {
    {}
  } else {
    stryCov_9fa48("242");
    const [loggedIn, setLoggedIn] = useState(stryMutAct_9fa48("243") ? true : (stryCov_9fa48("243"), false));
    const login = stryMutAct_9fa48("244") ? () => undefined : (stryCov_9fa48("244"), (() => {
      const login = () => setLoggedIn(stryMutAct_9fa48("245") ? false : (stryCov_9fa48("245"), true));
      return login;
    })());
    const logout = stryMutAct_9fa48("246") ? () => undefined : (stryCov_9fa48("246"), (() => {
      const logout = () => setLoggedIn(stryMutAct_9fa48("247") ? true : (stryCov_9fa48("247"), false));
      return logout;
    })());
    return <AuthContext.Provider value={stryMutAct_9fa48("248") ? {} : (stryCov_9fa48("248"), {
      loggedIn,
      login,
      logout
    })}>{children}</AuthContext.Provider>;
  }
};
export const useAuth = () => {
  if (stryMutAct_9fa48("249")) {
    {}
  } else {
    stryCov_9fa48("249");
    const context = useContext(AuthContext);
    if (stryMutAct_9fa48("252") ? false : stryMutAct_9fa48("251") ? true : stryMutAct_9fa48("250") ? context : (stryCov_9fa48("250", "251", "252"), !context)) {
      if (stryMutAct_9fa48("253")) {
        {}
      } else {
        stryCov_9fa48("253");
        throw new Error(stryMutAct_9fa48("254") ? "" : (stryCov_9fa48("254"), "useAuth must be used within an AuthProvider"));
      }
    }
    return context;
  }
};