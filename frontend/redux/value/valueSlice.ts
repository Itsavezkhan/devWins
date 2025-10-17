import { createSlice } from "@reduxjs/toolkit";
import { fetchDomainFieldValues } from "./valueThunks";

interface FieldValueEntry {
  value: number;
  date: string;
}

interface FieldData {
  fieldName: string;
  recentValues: FieldValueEntry[];
}

interface DomainFieldValuesResponse {
  domain: string;
  fields: FieldData[];
}

interface FieldValuesState {
  data: DomainFieldValuesResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: FieldValuesState = {
  data: null,
  loading: false,
  error: null,
};

const valueSlice = createSlice({
  name: "fieldValues",
  initialState, // ✅ use the typed state
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDomainFieldValues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDomainFieldValues.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDomainFieldValues.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch field values";
      });
  },
});

export default valueSlice.reducer;
