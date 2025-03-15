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
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DynamicTable } from "./DynamicTable";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation";
const EmailStatus = () => {
  if (stryMutAct_9fa48("31")) {
    {}
  } else {
    stryCov_9fa48("31");
    const [data, setData] = useState(stryMutAct_9fa48("32") ? ["Stryker was here"] : (stryCov_9fa48("32"), []));
    const navigate = useNavigate();
    useEffect(() => {
      if (stryMutAct_9fa48("33")) {
        {}
      } else {
        stryCov_9fa48("33");
        const fetchEmails = async () => {
          if (stryMutAct_9fa48("34")) {
            {}
          } else {
            stryCov_9fa48("34");
            if (stryMutAct_9fa48("36") ? false : stryMutAct_9fa48("35") ? true : (stryCov_9fa48("35", "36"), data.length)) {
              if (stryMutAct_9fa48("37")) {
                {}
              } else {
                stryCov_9fa48("37");
                return;
              }
            }
            try {
              if (stryMutAct_9fa48("38")) {
                {}
              } else {
                stryCov_9fa48("38");
                const token = localStorage.getItem(stryMutAct_9fa48("39") ? "" : (stryCov_9fa48("39"), "token"));
                const response = await axios.get(stryMutAct_9fa48("40") ? "" : (stryCov_9fa48("40"), "http://localhost:5005/api/emails/status"), stryMutAct_9fa48("41") ? {} : (stryCov_9fa48("41"), {
                  headers: stryMutAct_9fa48("42") ? {} : (stryCov_9fa48("42"), {
                    Authorization: stryMutAct_9fa48("43") ? `` : (stryCov_9fa48("43"), `Bearer ${token}`)
                  })
                }));
                if (stryMutAct_9fa48("45") ? false : stryMutAct_9fa48("44") ? true : (stryCov_9fa48("44", "45"), response.data.success)) {
                  if (stryMutAct_9fa48("46")) {
                    {}
                  } else {
                    stryCov_9fa48("46");
                    setData(response.data.emails);
                  }
                } else {
                  if (stryMutAct_9fa48("47")) {
                    {}
                  } else {
                    stryCov_9fa48("47");
                    console.error(stryMutAct_9fa48("48") ? "" : (stryCov_9fa48("48"), "Failed to fetch emails"), response.data.message);
                  }
                }
              }
            } catch (error) {
              if (stryMutAct_9fa48("49")) {
                {}
              } else {
                stryCov_9fa48("49");
                console.error(stryMutAct_9fa48("50") ? "" : (stryCov_9fa48("50"), "Error fetching emails"), error);
              }
            }
          }
        };
        fetchEmails();
      }
    }, stryMutAct_9fa48("51") ? ["Stryker was here"] : (stryCov_9fa48("51"), []));
    if (stryMutAct_9fa48("54") ? false : stryMutAct_9fa48("53") ? true : stryMutAct_9fa48("52") ? localStorage.getItem("token") : (stryCov_9fa48("52", "53", "54"), !localStorage.getItem(stryMutAct_9fa48("55") ? "" : (stryCov_9fa48("55"), "token")))) {
      if (stryMutAct_9fa48("56")) {
        {}
      } else {
        stryCov_9fa48("56");
        console.error(stryMutAct_9fa48("57") ? "" : (stryCov_9fa48("57"), "No token found in localStorage"));
        return <Box>
        <Typography variant="h4" color="red">
          Please login to view email status.
        </Typography>
      </Box>;
      }
    }
    return <>
          <Navigation />
    <Box sx={stryMutAct_9fa48("58") ? {} : (stryCov_9fa48("58"), {
        display: stryMutAct_9fa48("59") ? "" : (stryCov_9fa48("59"), "flex"),
        height: stryMutAct_9fa48("60") ? "" : (stryCov_9fa48("60"), "100vh"),
        width: stryMutAct_9fa48("61") ? "" : (stryCov_9fa48("61"), "100vw"),
        flexDirection: stryMutAct_9fa48("62") ? "" : (stryCov_9fa48("62"), "column"),
        alignItems: stryMutAct_9fa48("63") ? "" : (stryCov_9fa48("63"), "center"),
        justifyContent: stryMutAct_9fa48("64") ? "" : (stryCov_9fa48("64"), "center"),
        padding: 2,
        backgroundColor: stryMutAct_9fa48("65") ? "" : (stryCov_9fa48("65"), "grey")
      })}>
      <Box sx={stryMutAct_9fa48("66") ? {} : (stryCov_9fa48("66"), {
          alignSelf: stryMutAct_9fa48("67") ? "" : (stryCov_9fa48("67"), "flex-start")
        })}>
        <Button variant="contained" sx={stryMutAct_9fa48("68") ? {} : (stryCov_9fa48("68"), {
            color: stryMutAct_9fa48("69") ? "" : (stryCov_9fa48("69"), "white"),
            margin: 2
          })} onClick={stryMutAct_9fa48("70") ? () => undefined : (stryCov_9fa48("70"), () => navigate(stryMutAct_9fa48("71") ? "" : (stryCov_9fa48("71"), "/upload-emails")))}>
          Back to Dashboard
        </Button>
      </Box>
      <DynamicTable data={data} />
    </Box>
    </>;
  }
};
export default EmailStatus;