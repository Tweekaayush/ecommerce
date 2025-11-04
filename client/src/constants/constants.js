const BASE_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

export const AUTH_API = `${BASE_URL}/api/v1/auth`;
export const USER_API = `${BASE_URL}/api/v1/user`;
export const PRODUCT_API = `${BASE_URL}/api/v1/product`;
export const COUPON_API = `${BASE_URL}/api/v1/coupon`;
export const CART_API = `${BASE_URL}/api/v1/cart`;
export const PAYMENT_API = `${BASE_URL}/api/v1/payment`;
export const ORDER_API = `${BASE_URL}/api/v1/order`;
export const ANALYTICS_API = `${BASE_URL}/api/v1/analytics`;
export const WISHLIST_API = `${BASE_URL}/api/v1/wishlist`;
export const REVIEW_API = `${BASE_URL}/api/v1/review`;

export default BASE_URL;
