export { deleteUserAddress } from './address/delete-user-address';
export { getUserAddress } from './address/get-user-address';
export { setUserAddress } from './address/set-user-address';

export { authenticate, login } from './auth/login';
export { logout } from './auth/logout';
export { registerUser } from './auth/register';

export { getAllBrands } from './brands/get-all-brands';
export { getBrandsWithProductQuantity } from './brands/get-brands-with-product-quantity';

export { getCategories } from './category/get-categories';

export { createColor } from './colors/create-color';
export { getAllColors } from './colors/get-all-colors';

export { getProvinces } from './province/get-provinces';

export { placeOrder } from './order/place-order';
export { getOrderById } from './order/get-order-by-id';
export { getPaginatedOrders } from './order/get-paginated-orders';
export { getOrdersByUser } from './order/get-orders-by-user';

export { setTransactionId } from './payments/set-transaction-id';

export { getAllProductConditions } from './product-condition/get-all-product-conditions';

export { createUpdateProduct } from './product/create-update-product';
export { deleteProductImage } from './product/delete-product-image';
export { getAllProducts } from './product/get-all-products';
export { getProductBySlug } from './product/get-product-by-slug';
export { getStockBySlug } from './product/get-stock-by-slug';
export { getPaginatedProductsWithImages } from './product/product-pagination';
export { getCategoryPaginatedProductsWithImages } from './product/product-category-pagination';
export { updateStockProduct } from './product/update-stock-product';

export { changeManyUsersRole } from './user/change-many-users-role';
export { changeUserRole } from './user/change-user-role';
export { getPaginatedUsers } from './user/get-paginated-users';
export { updateUserEmail } from './user/update-user-email';

export { addFavorite } from './favorites/add-favorite';
export { getFavorites } from './favorites/get-favorites';
export { removeFavorite } from './favorites/remove-favorite';
