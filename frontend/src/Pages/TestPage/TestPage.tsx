import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import { useAppDispatch } from "../../Hooks/stateHooks";
import { decrement, increment, incrementByAmount, updateNumber } from "../../Store/countSlice";
import "./TestPage.css";
const TestPage = () => {
    const count = useSelector((state: RootState) => state.state.count);
    const number = useSelector((state: RootState) => state.state.number);
   
    const dispatch = useAppDispatch();

    
    return (
        
          <div className="testPageContainer">
      <div className="card">
        <h1 className="title">Count: {count}</h1>
        <p className="description">I set up React Redux and some basic routing to give us some kinda starting ground for the project 😊 </p>
        
      <button onClick={() => dispatch(increment())}>Increase by 1</button>
      <button onClick={() => dispatch(decrement())}>Decrease by 1</button>
      <button onClick={() => dispatch(incrementByAmount(number))}>
                    Increase by: {number}
                </button>
        
                <input
                    type="number"
                    value={number}
                    onChange={(e) => dispatch(updateNumber(Number(e.target.value)))}
                    placeholder="Enter a number"
                />
     </div>
    </div>
    );
    }

export default TestPage;
