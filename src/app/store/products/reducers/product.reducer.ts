import { createReducer, on } from '@ngrx/store';
import * as ProductActions from '../actions';
import { Product } from '@app/features/products/models/product';
import { HttpErrorResponse } from '@angular/common/http';

export interface ProductState {
  products: Product[];
  product: Product; 
  loading?: boolean;
  error?: HttpErrorResponse;
}

export const initialState: ProductState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

export const productReducer = createReducer(
  initialState,

  // Get products
  on(ProductActions.GET_PRODUCTS, (state) => ({ ...state, loading: true, error: null })),
  on(ProductActions.GET_PRODUCTS_SUCCESSFUL, (state, {products}) => ({
    ...state,
    products,
    loading: false,
    error: null,
  })),
  on(ProductActions.GET_PRODUCTS_ERROR, (state, { error }) => ({
    ...state,
    products: null,
    loading: false,
    error
  })),

  // Get product by ID
  on(ProductActions.GET_PRODUCT_BY_ID, (state) => ({ ...state, loading: true, error: null })),
  on(ProductActions.GET_PRODUCT_BY_ID_SUCCESSFUL, (state, { product }) => ({
    ...state,
    product,
    loading: false,
    error: null,
  })),
  on(ProductActions.GET_PRODUCT_BY_ID_ERROR, (state, { error }) => ({
    ...state,
    product: null,
    loading: false,
    error
  })),

  // Create product
  on(ProductActions.CREATE_PRODUCT, state => ({
    ...state,
    loading: true
  })),
  on(ProductActions.CREATE_PRODUCT_SUCCESSFUL, (state, { product }) => ({
    ...state,
    products: [...state.products, product],
    loading: false,
    error: null
  })),
  on(ProductActions.CREATE_PRODUCT_ERROR, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update product
  on(ProductActions.UPDATE_PRODUCT, state => ({
    ...state,
    loading: true
  })),
  on(ProductActions.UPDATE_PRODUCT_SUCCESSFUL, (state, { product }) => ({
    ...state,
    products: state.products.map(p => p.id === product.id ? product : p),
    product,
    loading: false,
    error: null
  })),
  on(ProductActions.UPDATE_PRODUCT_ERROR, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete product
  on(ProductActions.DELETE_PRODUCT, state => ({
    ...state,
    loading: true
  })),
  on(ProductActions.DELETE_PRODUCT_SUCCESSFUL, (state, { product }) => ({
    ...state,
    products: state.products.filter(p => p.id !== product.id),
    product: null,
    loading: false,
    error: null
  })),
  on(ProductActions.DELETE_PRODUCT_ERROR, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
