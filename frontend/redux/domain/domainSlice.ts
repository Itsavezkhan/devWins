import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDomains } from "./domainThunks";

export interface Domain {
  _id: string;
  name: string;
}

interface DomainState {
  domains: Domain[];
  loading: boolean;
  error: string | null;
}

const initialState: DomainState = {
  domains: [],
  loading: false,
  error: null,
};

const domainSlice = createSlice({
  name: "domain",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDomains.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDomains.fulfilled,
        (state, action: PayloadAction<Domain[]>) => {
          state.loading = false;
          state.domains = action.payload;
        }
      )
      .addCase(fetchDomains.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load domains";
      });
  },
});

export default domainSlice.reducer;
