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
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import { useAppDispatch } from "../../Hooks/stateHooks";
import { decrement, increment, incrementByAmount, updateNumber } from "../../Store/countSlice";
import "./TestPage.css";
const TestPage = () => {
  if (stryMutAct_9fa48("257")) {
    {}
  } else {
    stryCov_9fa48("257");
    const count = useSelector(stryMutAct_9fa48("258") ? () => undefined : (stryCov_9fa48("258"), (state: RootState) => state.state.count));
    const number = useSelector(stryMutAct_9fa48("259") ? () => undefined : (stryCov_9fa48("259"), (state: RootState) => state.state.number));
    const dispatch = useAppDispatch();
    return <div className="testPageContainer">
      <div className="card">
        <h1 className="title">Count: {count}</h1>
        <p className="description">I set up React Redux and some basic routing to give us some kinda starting ground for the project 😊 </p>
        
      <button onClick={stryMutAct_9fa48("260") ? () => undefined : (stryCov_9fa48("260"), () => dispatch(increment()))}>Increase by 1</button>
      <button onClick={stryMutAct_9fa48("261") ? () => undefined : (stryCov_9fa48("261"), () => dispatch(decrement()))}>Decrease by 1</button>
      <button onClick={stryMutAct_9fa48("262") ? () => undefined : (stryCov_9fa48("262"), () => dispatch(incrementByAmount(number)))}>
                    Increase by: {number}
                </button>
        
                <input type="number" value={number} onChange={stryMutAct_9fa48("263") ? () => undefined : (stryCov_9fa48("263"), e => dispatch(updateNumber(Number(e.target.value))))} placeholder="Enter a number" />
     </div>
    </div>;
  }
};
export default TestPage;