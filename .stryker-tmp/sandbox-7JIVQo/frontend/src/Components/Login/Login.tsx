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
import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { sliderClasses } from "@mui/material";
const Login = () => {
  if (stryMutAct_9fa48("111")) {
    {}
  } else {
    stryCov_9fa48("111");
    // Added states for username, email, and password
    const [email, setEmail] = useState(stryMutAct_9fa48("112") ? "Stryker was here!" : (stryCov_9fa48("112"), ""));
    const [password, setPassword] = useState(stryMutAct_9fa48("113") ? "Stryker was here!" : (stryCov_9fa48("113"), ""));
    const [message, setMessage] = useState(stryMutAct_9fa48("114") ? "Stryker was here!" : (stryCov_9fa48("114"), ""));
    const baseUrl = stryMutAct_9fa48("115") ? "" : (stryCov_9fa48("115"), "http://localhost:5005/api/auth"); // Base URL for the backend
    const navigate = useNavigate();
    const {
      loggedIn,
      login,
      logout
    } = useAuth();
    // Check if the user is already logged in
    login();
    console.log(stryMutAct_9fa48("116") ? "" : (stryCov_9fa48("116"), "Logged in status:"), loggedIn);
    if (stryMutAct_9fa48("118") ? false : stryMutAct_9fa48("117") ? true : (stryCov_9fa48("117", "118"), loggedIn)) {
      if (stryMutAct_9fa48("119")) {
        {}
      } else {
        stryCov_9fa48("119");
        navigate(stryMutAct_9fa48("120") ? "" : (stryCov_9fa48("120"), "/upload-emails"));
      }
    }
    // Login function now sends email and password to the backend

    const handleLogin = async () => {
      if (stryMutAct_9fa48("121")) {
        {}
      } else {
        stryCov_9fa48("121");
        try {
          if (stryMutAct_9fa48("122")) {
            {}
          } else {
            stryCov_9fa48("122");
            const response = await fetch(stryMutAct_9fa48("123") ? `` : (stryCov_9fa48("123"), `${baseUrl}/login`), stryMutAct_9fa48("124") ? {} : (stryCov_9fa48("124"), {
              method: stryMutAct_9fa48("125") ? "" : (stryCov_9fa48("125"), "POST"),
              headers: stryMutAct_9fa48("126") ? {} : (stryCov_9fa48("126"), {
                "Content-Type": stryMutAct_9fa48("127") ? "" : (stryCov_9fa48("127"), "application/json")
              }),
              body: JSON.stringify(stryMutAct_9fa48("128") ? {} : (stryCov_9fa48("128"), {
                email,
                password
              }))
            }));
            const data = await response.json();
            if (stryMutAct_9fa48("131") ? response.ok && data.token : stryMutAct_9fa48("130") ? false : stryMutAct_9fa48("129") ? true : (stryCov_9fa48("129", "130", "131"), response.ok || data.token)) {
              if (stryMutAct_9fa48("132")) {
                {}
              } else {
                stryCov_9fa48("132");
                setMessage(stryMutAct_9fa48("133") ? "" : (stryCov_9fa48("133"), "Login successful!"));
                // You can also store the token in localStorage or context for later use
                localStorage.setItem(stryMutAct_9fa48("134") ? "" : (stryCov_9fa48("134"), "token"), data.token);
                login();
                navigate(stryMutAct_9fa48("135") ? "" : (stryCov_9fa48("135"), "/upload-emails"));
              }
            } else {
              if (stryMutAct_9fa48("136")) {
                {}
              } else {
                stryCov_9fa48("136");
                setMessage(stryMutAct_9fa48("139") ? data.message && "Login failed. Please try again." : stryMutAct_9fa48("138") ? false : stryMutAct_9fa48("137") ? true : (stryCov_9fa48("137", "138", "139"), data.message || (stryMutAct_9fa48("140") ? "" : (stryCov_9fa48("140"), "Login failed. Please try again."))));
              }
            }
          }
        } catch (error) {
          if (stryMutAct_9fa48("141")) {
            {}
          } else {
            stryCov_9fa48("141");
            setMessage(stryMutAct_9fa48("142") ? "" : (stryCov_9fa48("142"), "An error occurred during login. Please try again."));
          }
        }
      }
    };
    return <div className="login-container">
      <h1>Login</h1>

      <div className="form-group">
        <input className="login-input" placeholder="Email" value={email} onChange={stryMutAct_9fa48("143") ? () => undefined : (stryCov_9fa48("143"), e => setEmail(e.target.value))} />
      </div>
      <div className="form-group">
        <input type="password" className="login-input" placeholder="Password" value={password} onChange={stryMutAct_9fa48("144") ? () => undefined : (stryCov_9fa48("144"), e => setPassword(e.target.value))} />
      </div>
      <div className="button-group">
        <button className="login-button" onClick={handleLogin}>
          Log In
        </button>
        <button className="register-button" onClick={stryMutAct_9fa48("145") ? () => undefined : (stryCov_9fa48("145"), () => navigate(stryMutAct_9fa48("146") ? "" : (stryCov_9fa48("146"), "/register")))}>
          Register
        </button>
      </div>
      <div>
        <p>Please log in to continue.</p>
        <p>{message}</p>
      </div>
    </div>;
  }
};
export default Login;