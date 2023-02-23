import { createAction, props } from '@ngrx/store';
import { Product } from '@app/features/products/models/product';

export const GET_PRODUCTS  = createAction(
  '[PRODUCTS Page] GET_PRODUCTS',
);

export const GET_PRODUCTS_SUCCESSFUL = createAction(
  '[PRODUCTS Page] GET_PRODUCTS_SUCCESSFUL',
  props<{ products: Product[] }>()
);

export const GET_PRODUCTS_ERROR = createAction(
  '[PRODUCTS Page] GET_PRODUCTS_ERROR',
  props<{ error: any }>()
);

export const GET_PRODUCT_BY_ID  = createAction(
  '[PRODUCTS Page] GET_PRODUCT_BY_ID',
  props<{ id: string }>()
);

export const GET_PRODUCT_BY_ID_SUCCESSFUL = createAction(
  '[PRODUCTS Page] GET_PRODUCT_BY_ID_SUCCESSFUL',
  props<{ product: Product }>()
);

export const GET_PRODUCT_BY_ID_ERROR = createAction(
  '[PRODUCTS Page] GET_PRODUCT_BY_ID_ERROR',
  props<{ error: any }>()
);

export const CREATE_PRODUCT  = createAction(
  '[PRODUCTS Page] CREATE_PRODUCT',
  props<{ product: Product }>()
);

export const CREATE_PRODUCT_SUCCESSFUL = createAction(
  '[PRODUCTS Page] CREATE_PRODUCT_SUCCESSFUL',
  props<{ product: any }>()
);

export const CREATE_PRODUCT_ERROR = createAction(
  '[PRODUCTS Page] CREATE_PRODUCT_ERROR',
  props<{ error: any }>()
);

export const UPDATE_PRODUCT  = createAction(
  '[PRODUCTS Page] UPDATE_PRODUCT',
  props<{ product: Product }>()
);

export const UPDATE_PRODUCT_SUCCESSFUL = createAction(
  '[PRODUCTS Page] UPDATE_PRODUCT_SUCCESSFUL',
  props<{ product: any }>()
);

export const UPDATE_PRODUCT_ERROR = createAction(
  '[PRODUCTS Page] UPDATE_PRODUCT_ERROR',
  props<{ error: any }>()
);

export const DELETE_PRODUCT  = createAction(
  '[PRODUCTS Page] DELETE_PRODUCT',
  props<{ id: string }>()
);

export const DELETE_PRODUCT_SUCCESSFUL = createAction(
  '[PRODUCTS Page] DELETE_PRODUCT_SUCCESSFUL',
  props<{ product: any }>()
);

export const DELETE_PRODUCT_ERROR = createAction(
  '[PRODUCTS Page] DELETE_PRODUCT_ERROR',
  props<{ error: any }>()
);