// src/redux/slices/fieldSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFieldsByDomain, addDailyFieldValues } from "./fieldThunks";

interface Field {
  _id: string;
  name: string;
  [key: string]: any; // optional flexibility
}

interface FieldState {
  fields: Field[];
  loading: boolean;
  error: string | null;
}

const initialState: FieldState = {
  fields: [],
  loading: false,
  error: null,
};

const fieldSlice = createSlice({
  name: "fields",
  initialState,
  reducers: {
    clearFields: (state) => {
      state.fields = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFieldsByDomain.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFieldsByDomain.fulfilled,
        (state, action: PayloadAction<Field[]>) => {
          state.loading = false;
          state.fields = action.payload;
        }
      )
      .addCase(fetchFieldsByDomain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addDailyFieldValues.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDailyFieldValues.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addDailyFieldValues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearFields } = fieldSlice.actions;
export default fieldSlice.reducer;
