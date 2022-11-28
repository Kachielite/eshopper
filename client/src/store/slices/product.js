import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    checkedProduct: [],
    checked: false,
  },
  reducers: {
    checkAllProductsHandler: (state, action) => {
      if (state.checked === false) {
        state.checkedProduct = [];
        state.checked = true;
        action.payload.map(
          (item) =>
            (state.checkedProduct = [
              ...state.checkedProduct,
              { id: item._id, isChecked: true },
            ])
        );
      } else {
        state.checked = false;
        state.checkedProduct = [];
      }
    },
    checkProductHandler: (state, action) => {
      if (state.checked) {
        state.checked = false;
        let filteredArray = state.checkedProduct.filter(
          (i) => i.id !== action.payload.id
        );
        state.checkedProduct = [...filteredArray];
      } else {
        if (action.payload.checked) {
          state.checkedProduct = [
            ...state.checkedProduct,
            {
              id: action.payload.id,
              isChecked: action.payload.checked,
            },
          ];
        } else {
          if (
            state.checkedProduct.find(
              (item) => item.id === action.payload.id
            )
          ) {
            let filteredArray = state.checkedProduct.filter(
              (item) => item.id !== action.payload.id
            );
            state.checkedProduct = filteredArray;
          } else {
            return;
          }
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { checkAllProductsHandler, checkProductHandler } =
  productSlice.actions;

export default productSlice.reducer;
