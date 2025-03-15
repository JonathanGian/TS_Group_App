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
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
const Register = () => {
  if (stryMutAct_9fa48("191")) {
    {}
  } else {
    stryCov_9fa48("191");
    // Added states for username, email, and password
    const [username, setUsername] = useState(stryMutAct_9fa48("192") ? "Stryker was here!" : (stryCov_9fa48("192"), ""));
    const [email, setEmail] = useState(stryMutAct_9fa48("193") ? "Stryker was here!" : (stryCov_9fa48("193"), ""));
    const [password, setPassword] = useState(stryMutAct_9fa48("194") ? "Stryker was here!" : (stryCov_9fa48("194"), ""));
    const [message, setMessage] = useState(stryMutAct_9fa48("195") ? "Stryker was here!" : (stryCov_9fa48("195"), ""));
    const baseUrl = stryMutAct_9fa48("196") ? "" : (stryCov_9fa48("196"), "http://localhost:5005/api"); // Base URL for the backend
    const navigate = useNavigate();
    // Registration sends username, email, and password to the backend
    const handleRegister = async () => {
      if (stryMutAct_9fa48("197")) {
        {}
      } else {
        stryCov_9fa48("197");
        try {
          if (stryMutAct_9fa48("198")) {
            {}
          } else {
            stryCov_9fa48("198");
            const response = await fetch(stryMutAct_9fa48("199") ? `` : (stryCov_9fa48("199"), `${baseUrl}/auth/register`), stryMutAct_9fa48("200") ? {} : (stryCov_9fa48("200"), {
              method: stryMutAct_9fa48("201") ? "" : (stryCov_9fa48("201"), "POST"),
              headers: stryMutAct_9fa48("202") ? {} : (stryCov_9fa48("202"), {
                "Content-Type": stryMutAct_9fa48("203") ? "" : (stryCov_9fa48("203"), "application/json")
              }),
              body: JSON.stringify(stryMutAct_9fa48("204") ? {} : (stryCov_9fa48("204"), {
                username,
                email,
                password
              }))
            }));
            const data = await response.json();
            console.log(stryMutAct_9fa48("205") ? "" : (stryCov_9fa48("205"), "Registration response:"), data);
            if (stryMutAct_9fa48("207") ? false : stryMutAct_9fa48("206") ? true : (stryCov_9fa48("206", "207"), response.ok)) {
              if (stryMutAct_9fa48("208")) {
                {}
              } else {
                stryCov_9fa48("208");
                setMessage(stryMutAct_9fa48("211") ? data.message && "Registration successful!" : stryMutAct_9fa48("210") ? false : stryMutAct_9fa48("209") ? true : (stryCov_9fa48("209", "210", "211"), data.message || (stryMutAct_9fa48("212") ? "" : (stryCov_9fa48("212"), "Registration successful!"))));
              }
            } else {
              if (stryMutAct_9fa48("213")) {
                {}
              } else {
                stryCov_9fa48("213");
                setMessage(stryMutAct_9fa48("216") ? data.message && "Registration failed. Please try again." : stryMutAct_9fa48("215") ? false : stryMutAct_9fa48("214") ? true : (stryCov_9fa48("214", "215", "216"), data.message || (stryMutAct_9fa48("217") ? "" : (stryCov_9fa48("217"), "Registration failed. Please try again."))));
              }
            }
          }
        } catch (error) {
          if (stryMutAct_9fa48("218")) {
            {}
          } else {
            stryCov_9fa48("218");
            setMessage(stryMutAct_9fa48("219") ? "" : (stryCov_9fa48("219"), "An error occurred during registration. Please try again."));
          }
        }
      }
    };
    return <Container maxWidth="sm">
         <Button variant="outlined" color="primary" component={Link} to="/login" sx={stryMutAct_9fa48("220") ? {} : (stryCov_9fa48("220"), {
        marginTop: 2,
        marginBottom: 2
      })}>
            Back to Login
        </Button>
      <Box sx={stryMutAct_9fa48("221") ? {} : (stryCov_9fa48("221"), {
        marginTop: 8,
        display: stryMutAct_9fa48("222") ? "" : (stryCov_9fa48("222"), "flex"),
        flexDirection: stryMutAct_9fa48("223") ? "" : (stryCov_9fa48("223"), "column"),
        alignItems: stryMutAct_9fa48("224") ? "" : (stryCov_9fa48("224"), "center")
      })}>
        <Typography component="h1" variant="h4" gutterBottom>
          Registration
        </Typography>
        <Box component="form" sx={stryMutAct_9fa48("225") ? {} : (stryCov_9fa48("225"), {
          width: stryMutAct_9fa48("226") ? "" : (stryCov_9fa48("226"), "100%")
        })}>
          <TextField label="Username" variant="outlined" value={username} onChange={stryMutAct_9fa48("227") ? () => undefined : (stryCov_9fa48("227"), e => setUsername(e.target.value))} fullWidth margin="normal" />
          <TextField label="Email" variant="outlined" value={email} onChange={stryMutAct_9fa48("228") ? () => undefined : (stryCov_9fa48("228"), e => setEmail(e.target.value))} fullWidth margin="normal" />
          <TextField label="Password" type="password" variant="outlined" value={password} onChange={stryMutAct_9fa48("229") ? () => undefined : (stryCov_9fa48("229"), e => setPassword(e.target.value))} fullWidth margin="normal" />
          <Button variant="contained" color="primary" onClick={handleRegister} fullWidth sx={stryMutAct_9fa48("230") ? {} : (stryCov_9fa48("230"), {
            mt: 2
          })}>
            Register
          </Button>
          {stryMutAct_9fa48("233") ? message || <Typography variant="body1" align="center" sx={{
            mt: 2
          }}>
              {message}
            </Typography> : stryMutAct_9fa48("232") ? false : stryMutAct_9fa48("231") ? true : (stryCov_9fa48("231", "232", "233"), message && <Typography variant="body1" align="center" sx={stryMutAct_9fa48("234") ? {} : (stryCov_9fa48("234"), {
            mt: 2
          })}>
              {message}
            </Typography>)}
          <Typography variant="body1" align="center" sx={stryMutAct_9fa48("235") ? {} : (stryCov_9fa48("235"), {
            mt: 2
          })}>
            Please register to continue.
          </Typography>
          <Typography variant="body2" align="center" sx={stryMutAct_9fa48("236") ? {} : (stryCov_9fa48("236"), {
            mt: 2
          })}>
            Already have an account? <Link to="/login" style={stryMutAct_9fa48("237") ? {} : (stryCov_9fa48("237"), {
              textDecoration: stryMutAct_9fa48("238") ? "" : (stryCov_9fa48("238"), 'none')
            })}>Login</Link> to continue.
          </Typography>
        </Box>
      </Box>
    </Container>

    /*  Here it is in the original format but wanted to try MUI   
    
    <div className="login-container">
          <h1>Registration</h1>
          <div className="form-group">
            <input
              className="login-input"
              placeholder="Username (for registration)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="login-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button-group">
            <button className="register-button" onClick={handleRegister}>
              Register
            </button>
          </div>
          <p>{message}</p>
          <p>Please register to continue.</p>
          <button
            className="login-button"
            onClick={() => navigate("/login")}
          >Back to Login</button>
          <p>Already have an account? <a href="/login">Login</a> to continue.</p>
        </div> */;
  }
};
export default Register;