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
import axios from "axios";
import Navigation from "../Navigation";
import { Container, TextField, Button, Typography, Grid, Box } from "@mui/material";
const UploadEmails: React.FC = () => {
  if (stryMutAct_9fa48("72")) {
    {}
  } else {
    stryCov_9fa48("72");
    const [email, setEmail] = useState(stryMutAct_9fa48("73") ? "Stryker was here!" : (stryCov_9fa48("73"), ""));
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState(stryMutAct_9fa48("74") ? "Stryker was here!" : (stryCov_9fa48("74"), ""));
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (stryMutAct_9fa48("75")) {
        {}
      } else {
        stryCov_9fa48("75");
        if (stryMutAct_9fa48("78") ? e.target.files || e.target.files.length > 0 : stryMutAct_9fa48("77") ? false : stryMutAct_9fa48("76") ? true : (stryCov_9fa48("76", "77", "78"), e.target.files && (stryMutAct_9fa48("81") ? e.target.files.length <= 0 : stryMutAct_9fa48("80") ? e.target.files.length >= 0 : stryMutAct_9fa48("79") ? true : (stryCov_9fa48("79", "80", "81"), e.target.files.length > 0)))) {
          if (stryMutAct_9fa48("82")) {
            {}
          } else {
            stryCov_9fa48("82");
            setFile(e.target.files[0]);
          }
        }
      }
    };
    const handleSubmit = async (e: React.FormEvent) => {
      if (stryMutAct_9fa48("83")) {
        {}
      } else {
        stryCov_9fa48("83");
        e.preventDefault();
        const formData = new FormData();
        if (stryMutAct_9fa48("85") ? false : stryMutAct_9fa48("84") ? true : (stryCov_9fa48("84", "85"), file)) {
          if (stryMutAct_9fa48("86")) {
            {}
          } else {
            stryCov_9fa48("86");
            formData.append(stryMutAct_9fa48("87") ? "" : (stryCov_9fa48("87"), "file"), file);
          }
        }
        if (stryMutAct_9fa48("90") ? email : stryMutAct_9fa48("89") ? false : stryMutAct_9fa48("88") ? true : (stryCov_9fa48("88", "89", "90"), email.trim())) {
          if (stryMutAct_9fa48("91")) {
            {}
          } else {
            stryCov_9fa48("91");
            formData.append(stryMutAct_9fa48("92") ? "" : (stryCov_9fa48("92"), "email"), stryMutAct_9fa48("93") ? email : (stryCov_9fa48("93"), email.trim()));
          }
        }
        try {
          if (stryMutAct_9fa48("94")) {
            {}
          } else {
            stryCov_9fa48("94");
            const token = localStorage.getItem(stryMutAct_9fa48("95") ? "" : (stryCov_9fa48("95"), "token")); // Adjust token retrieval as needed
            const response = await axios.post(stryMutAct_9fa48("96") ? "" : (stryCov_9fa48("96"), "http://localhost:5005/api/emails/upload-emails"), formData, stryMutAct_9fa48("97") ? {} : (stryCov_9fa48("97"), {
              headers: stryMutAct_9fa48("98") ? {} : (stryCov_9fa48("98"), {
                "Content-Type": stryMutAct_9fa48("99") ? "" : (stryCov_9fa48("99"), "multipart/form-data"),
                Authorization: stryMutAct_9fa48("100") ? `` : (stryCov_9fa48("100"), `Bearer ${token}`)
              })
            }));
            setMessage(response.data.message);
          }
        } catch (error: any) {
          if (stryMutAct_9fa48("101")) {
            {}
          } else {
            stryCov_9fa48("101");
            console.error(stryMutAct_9fa48("102") ? "" : (stryCov_9fa48("102"), "Error uploading emails:"), error);
            setMessage(stryMutAct_9fa48("103") ? "" : (stryCov_9fa48("103"), "Error uploading emails"));
          }
        }
      }
    };
    return <>
    <div>
   <h1>Upload Emails</h1>
      <form onSubmit={handleSubmit}>
        
        <input onChange={stryMutAct_9fa48("104") ? () => undefined : (stryCov_9fa48("104"), e => setEmail(e.target.value))} placeholder="Enter email address" />
              <input type="file" id="file" accept=".txt, .csv" onChange={handleFileChange} style={stryMutAct_9fa48("105") ? {} : (stryCov_9fa48("105"), {
            width: stryMutAct_9fa48("106") ? "" : (stryCov_9fa48("106"), "100%"),
            padding: stryMutAct_9fa48("107") ? "" : (stryCov_9fa48("107"), "8px")
          })} />
            <button type="submit">Upload</button>
            
      </form>
      {stryMutAct_9fa48("110") ? message || <p>{message}</p> : stryMutAct_9fa48("109") ? false : stryMutAct_9fa48("108") ? true : (stryCov_9fa48("108", "109", "110"), message && <p>{message}</p>)}
    </div>
    </>;
  }
};
export default UploadEmails;