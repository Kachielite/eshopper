import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async ({filters, pageNumber}) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/v1/products?quantity=${filters.quantity}&page=${pageNumber}&category=${filters.category}&status=${filters.status}`,
        { headers: { "content-type": "application/x-www-form-urlencoded" } }
      );
        

      return res.data;
    } catch (error) {
      console.log(error)
    }

  }
);

export const fetchAllCategories = createAsyncThunk(
  "product/fetchAllCategories",
  async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/v1/products/categories`
      );
      return res.data;
    } catch (error) {
      console.log(error)
    }

  }
);

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
    error: "",
  },
  reducers: {
    //--------- Fetch All Products Handler----------------------------//
    productsHandler: (state, action) => {
      state.sortedArray = action.products;
      state.totalItems = action.totalNumberOfProducts;
      state.lastPage = action.lastPage;
      state.nextPage = action.nextPage;
      state.lastPage = action.previousPage;
      state.isLoading = false;
    },
    // ------------ Fetch All Categories --------------------- //
    fetchAllCategoriesHandler: (state, action) => {
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
    filterHandler: (state, action) => {
      if (action.payload.type === "category") {
        state.filter = { ...state.filter, category: action.payload.item };
      } else if (action.payload.type === "quantity") {
        state.filter = { ...state.filter, quantity: action.payload.item };
      } else {
        state.filter = { ...state.filter, status: action.payload.item };
      }
      state.page = 1;
    },
    // ----------- Sort Products Handler ------------------------------//
    sortProductsHandler: (state, action) => {
      state.column = action.payload.property;

      if (action.payload.property === "date" || action.payload.property === "price") {
        if (state.sortOrder === "desc") {
          state.sortOrder = "asc"
          let array = [...state.sortedArray].sort((a, b) => {
            if (action.payload.property === "date") {
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
            if (action.payload.property === "date") {
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
          state.sortOrder = "asc"
          let array = [...state.sortedArray].sort((a, b) =>
            a[action.payload.property] > b[action.payload.property]
              ? 1
              : b[action.payload.property] > a[action.payload.property]
              ? -1
              : 0
          );
          state.sortedArray = array;
        } else {
          state.sortOrder = "desc";
          let array = [...state.sortedArray]
            .sort((a, b) =>
              a[action.payload.property] > b[action.payload.property]
                ? 1
                : b[action.payload.property] > a[action.payload.property]
                ? -1
                : 0
            )
            .reverse();
          state.sortedArray = array;
        }
      }
    },
    // ------------ Set Page Number Handler ---------------------//
    setPageHandler: (state, action) => {
      console.log(action)
      state.page = action.payload;
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
  extraReducers: {
    [fetchAllProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAllProducts.fulfilled]: (state, { payload}) => {
      state.sortedArray = payload.products;
      state.totalItems = payload.totalNumberOfProducts;
      state.lastPage = payload.lastPage;
      state.nextPage = payload.nextPage;
      state.previousPage = payload.previousPage;
      state.isLoading = false;
    },
    [fetchAllProducts.rejected]: (state) => {
      state.isLoading = false;
    },
    [fetchAllCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAllCategories.fulfilled]: (state, { payload }) => {
      state.categoriesList = payload.category;
    },
    [fetchAllCategories.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  filterHandler,
  setPageHandler,
  sortProductsHandler,
  checkAllProductsHandler,
  checkProductHandler,
} = productSlice.actions;

export default productSlice.reducer;
