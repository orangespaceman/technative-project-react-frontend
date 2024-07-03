import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../services/apiService";

//Get all bags
export const fetchBags = createAsyncThunk("bags/fetchBags", async () => {
  const response = await apiService("bags", { method: "GET" });
  return response;
});

// Fetching all bags belonging to one user:
export const fetchBagByUser = createAsyncThunk(
  "bags/fetchBagByUser",
  async (userId) => {
    const response = await apiService("bags/fetchByUser", {
      method: "GET",
    });
    return response;
  }
);

// export const fetchMyBag = createAsyncThunk(
//     "bags/fetchMyBag",
//     async () => {
//         const response = await apiService(`my-things`, {
//             method: "GET",
//         });
//         return response;
//     }
// );

//Gets one bag
export const fetchBag = createAsyncThunk("bags/fetchBag", async (id) => {
  return await apiService(`bags/${id}`, { method: "GET" });
});

export const addBag = createAsyncThunk("bags/addBag", async (newBag) => {
  const response = await apiService("bags", {
    method: "POST",
    body: JSON.stringify(newBag),
  });
  return response;
});

// export const editThing = createAsyncThunk(
//     "bags/editThing",
//     async ({ id, updatedThing }) => {
//         const response = await apiService(`my-bag/${id}`, {
//             method: "PUT",
//             body: JSON.stringify(updatedThing),
//         });
//         return response;
//     }
// );

// export const deleteThing = createAsyncThunk(
//     "bags/deleteThing",
//     async (id) => {
//         await apiService(`my-Bag/${id}`, { method: "DELETE" });
//         return id;
//     }
// );

const BagSlice = createSlice({
  name: "bags",
  initialState: {
    items: [],
    userBags: [],
    currentThing: null,
    status: "idle",
    userBagStatus: "idle",
    currentBagstatus: "idle",
    error: null,
    userBagError: null,
    currentThingError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBags.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBags.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.items = ["hello i am wrong", "and i suck"];
        state.items = action.payload;
      })
      .addCase(fetchBags.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBagByUser.pending, (state) => {
        state.userBagStatus = "loading";
      })
      .addCase(fetchBagByUser.fulfilled, (state, action) => {
        state.userBagStatus = "succeeded";
        state.userBags = action.payload;
      })
      .addCase(fetchBagByUser.rejected, (state, action) => {
        state.userBagStatus = "failed";
        state.userBagError = action.error.message;
      })
      // .addCase(fetchMyBag.pending, (state) => {
      //   state.userBagStatus = "loading";
      // })
      // .addCase(fetchMyBag.fulfilled, (state, action) => {
      //   state.userBagStatus = "succeeded";
      //   state.userBag = action.payload;
      // })
      // .addCase(fetchMyBag.rejected, (state, action) => {
      //   state.userBagStatus = "failed";
      //   state.userBagError = action.error.message;
      // })
      .addCase(fetchBag.pending, (state) => {
        state.currentBagstatus = "loading";
      })
      .addCase(fetchBag.fulfilled, (state, action) => {
        state.currentBagstatus = "succeeded";
        state.currentThing = action.payload;
      })
      .addCase(fetchBag.rejected, (state, action) => {
        state.currentBagstatus = "failed";
        state.currentThingError = action.error.message;
      });
    // .addCase(addThing.fulfilled, (state, action) => {
    //     state.items.push(action.payload);
    // })
    // .addCase(editThing.fulfilled, (state, action) => {
    //     const index = state.items.findIndex(
    //         (item) => item.id === action.payload.id
    //     );
    //     state.items[index] = action.payload;
    // })
    // .addCase(deleteThing.fulfilled, (state, action) => {
    //     state.items = state.items.filter(
    //         (item) => item.id !== action.payload
    //     );
    // });
  },
});

export default BagSlice.reducer;
