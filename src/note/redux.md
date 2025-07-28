# Redux

## 异步修改状态

Redux Toolkit (RTK) + createAsyncThunk

通过 createAsyncThunk 封装异步逻辑，自动生成 pending/fulfilled/rejected 三类 action，减少样板代码

```js
import {
  createAsyncThunk,
  createSlice,
  configureStore,
} from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/fetch", async (userId) => {
  const resp = await fetch(`/api/users/${userId}`);
  return resp.json();
});

const userSlice = createSlice({
  name: "user",
  initialState: { data: null, status: "idle", error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const store = configureStore({ reducer: { user: userSlice.reducer } });
```
