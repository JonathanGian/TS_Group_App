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
import axios from "axios";
export interface Email {
  id: number;
  subject: string;
  content: string;
}
export interface EmailStatus {
  id: number;
  status: string;
  sentAt: string;
}
export interface UploadResponse {
  success: boolean;
  message: string;
}
export const fetchEmails = async (): Promise<Email[]> => {
  if (stryMutAct_9fa48("275")) {
    {}
  } else {
    stryCov_9fa48("275");
    const response = await axios.get(stryMutAct_9fa48("276") ? "" : (stryCov_9fa48("276"), "/api/emails"));
    return response.data;
  }
};
export const uploadEmails = async (emails: string[]): Promise<UploadResponse> => {
  if (stryMutAct_9fa48("277")) {
    {}
  } else {
    stryCov_9fa48("277");
    const response = await axios.post(stryMutAct_9fa48("278") ? "" : (stryCov_9fa48("278"), "/api/emails/upload"), stryMutAct_9fa48("279") ? {} : (stryCov_9fa48("279"), {
      emails
    }));
    return response.data;
  }
};
export const checkEmailStatus = async (emailId: number): Promise<EmailStatus> => {
  if (stryMutAct_9fa48("280")) {
    {}
  } else {
    stryCov_9fa48("280");
    const response = await axios.get(stryMutAct_9fa48("281") ? `` : (stryCov_9fa48("281"), `/api/emails/${emailId}/status`));
    return response.data;
  }
};