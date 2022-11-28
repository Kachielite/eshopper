import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    sortedArray: [],
    totalItems: 0,
    page: 1,
    lastPage: 0,
    nextPage: 0,
    previousPage: 0,
    categoriesList: [],
    filter: { category: "All Categories", quantity: 10, status: "All Status" },
    sortOrder: "desc",
    column: "",
    checkedProduct: [],
    checked: false,
  },
  reducers: {
    //--------- Fetch All Products Handler----------------------------//
    fetchAllProductsHandler: (state, actions) => {
      axios
        .get(
          `${process.env.REACT_APP_ENDPOINT}/v1/products?quantity=${state.filter.quantity}&page=${state.page}&category=${state.filter.category}&status=${state.filter.status}`,
          { headers: { "content-type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          state.sortedArray = res.data.products;
          state.totalItems = res.data.totalNumberOfProducts;
          state.lastPage = res.data.lastPage;
          state.nextPage = res.data.nextPage;
          state.lastPage = res.data.previousPage;
          state.isLoading = false;
        })
        .catch((error) => {
          state.isLoading = false;
          console.log(error);
        });
    },
    // ------------ Fetch All Categories --------------------- //
    fetchAllCategoriesHandler: (state, actions) => {
      axios
        .get(`${process.env.REACT_APP_ENDPOINT}/v1/products/categories`)
        .then((res) => {
          state.categoriesList = res.data.category;
        })
        .catch((error) => {
          state.isLoading = false;
          console.log(error);
        });
    },
    // ------------ Filter Handler --------------------- //
    filterHandler: (state, actions) => {
      if (actions.type === "category") {
        state.filter = { ...state.filter, category: actions.item };
      } else if (actions.type === "quantity") {
        state.filter = { ...state.filter, quantity: actions.item };
      } else {
        state.filter = { ...state.filter, status: actions.item };
      }
      state.page = 1;
    },
    // ----------- Sort Products Handler ------------------------------//
    sortProductsHandler: (state, actions) => {
      state.sortOrder = "desc";
      state.column = actions.property;

      if (actions.property === "date" || actions.property === "price") {
        if (state.sortOrder === "desc") {
          let array = [...state.sortedArray].sort((a, b) => {
            if (actions.property === "date") {
              a = new Date(a.createdAt);
              b = new Date(b.createdAt);
            } else {
              a = a.price.slice(1);
              b = b.price.slice(1);
            }
            return a - b;
          });
          state.sortedArray = array;
        } else {
          state.sortOrder = "desc";
          let array = [...state.sortedArray].sort((a, b) => {
            if (actions.property === "date") {
              a = new Date(a.createdAt);
              b = new Date(b.createdAt);
            } else {
              a = a.price.slice(1);
              b = b.price.slice(1);
            }
            return b - a;
          });
          state.sortedArray = array;
        }
      } else {
        if (state.sortOrder === "desc") {
          let array = [...state.sortedArray].sort((a, b) =>
            a[actions.property] > b[actions.property]
              ? 1
              : b[actions.property] > a[actions.property]
              ? -1
              : 0
          );
          state.sortedArray = array;
        } else {
          state.state.sortOrder = "desc";
          let array = [...state.sortedArray]
            .sort((a, b) =>
              a[actions.property] > b[actions.property]
                ? 1
                : b[actions.property] > a[actions.property]
                ? -1
                : 0
            )
            .reverse();
          state.sortedArray = array;
        }
      }
    },
    // ------------ Set Page Number Handler ---------------------//
    setPageHandler: (state, actions) => {
      state.page = actions.pageNumber;
    },
    // --------------- Checking items Handler ------------------------ //
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
            state.checkedProduct.find((item) => item.id === action.payload.id)
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
export const {
  fetchAllProductsHandler,
  fetchAllCategoriesHandler,
  filterHandler,
  setPageHandler,
  sortProductsHandler,
  checkAllProductsHandler,
  checkProductHandler,
} = productSlice.actions;

export default productSlice.reducer;
