import { createSlice } from "@reduxjs/toolkit";



/* Syntax for createAsyncThunk:

    export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await axios.get<Product[]>("https://fakestoreapi.com/products"); // You dont have to put in the type here
    return response.data;

})
 */

export const countSlice = createSlice({
    name: "count",
    initialState: {
        count: 1 as number,
        number: 0 as number,
    },
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        incrementByAmount: (state, action) => {
            state.count += action.payload;
        },
        updateNumber: (state, action) => {
            state.number = action.payload; // Update Redux state with input
        }
    },
   /* Extra reducers syntax:
    
        extraReducers(builder) {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLoading = false;
        })
        
    } */
})
export const { increment,decrement,incrementByAmount, updateNumber} = countSlice.actions;

export default countSlice.reducer;