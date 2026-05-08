import { UserCartItemResponse } from "@/types/cart-item";
import { ProductItem } from "@/types";
export interface LocalStorageKey {
  key: string;
  value: any;
}

export class LocalStorageService {
  static CART_KEY = "shopping_cart";
  static RECENTLY_VIEWED_KEY = "recently_viewed_products";

  static isBrowser(): boolean {
    return typeof window !== "undefined";
  }

  static storeData(key: string, value: any): void {
    if (!LocalStorageService.isBrowser()) {
      console.warn("localStorage is not available on the server");
      return;
    }

    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error storing data: ${error}`);
    }
  }

  static getData<T>(key: string): T | null {
    if (!LocalStorageService.isBrowser()) {
      console.warn("localStorage is not available on the server");
      return null;
    }

    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return null;
      }
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error(`Error retrieving data: ${error}`);
      return null;
    }
  }

  static updateCart(newCartItems?: UserCartItemResponse[]): void {
    if (!LocalStorageService.isBrowser()) return;

    try {
      LocalStorageService.storeData(LocalStorageService.CART_KEY, newCartItems);
    } catch (error) {
      console.error(`Error updating cart: ${error}`);
    }
  }

  static findCartItemByName(name: string): UserCartItemResponse | null {
    const cartItems = LocalStorageService.getCart();
    if (!cartItems) return null;

    const foundItem = cartItems.find((item) => item.product.title === name);

    return foundItem ? foundItem : null;
  }

  static handleSelectItem(isAll: boolean, productName?: string): void {
    const cartItems = LocalStorageService.getCart() || [];

    const existingProductIndex = cartItems.findIndex(
      (item) => item.product.title === productName
    );

    if (existingProductIndex >= 0) {
      cartItems[existingProductIndex].choose =
        !cartItems[existingProductIndex].choose;

      LocalStorageService.storeData(LocalStorageService.CART_KEY, cartItems);
      return;
    }

    if (isAll) {
      const updatedCartItems = cartItems.map((item) => ({
        ...item,
        choose: true,
      }));
      LocalStorageService.storeData(
        LocalStorageService.CART_KEY,
        updatedCartItems
      );
    } else {
      const updatedCartItems = cartItems.map((item) => ({
        ...item,
        choose: false,
      }));
      LocalStorageService.storeData(
        LocalStorageService.CART_KEY,
        updatedCartItems
      );
    }
  }

  static removeItemFrmCart(productName: string): void {
    const cartItems = LocalStorageService.getCart() || [];
    const updatedCartItems = cartItems.filter(
      (item) => item.product.title !== productName
    );
    LocalStorageService.storeData(
      LocalStorageService.CART_KEY,
      updatedCartItems
    );
  }

  static createOrUpdateCart(product: UserCartItemResponse): void {
    const cartItems = LocalStorageService.getCart() || [];
    const existingProductIndex = cartItems.findIndex(
      (item) => item.product.title === product.product.title
    );

    if (existingProductIndex >= 0) {
      cartItems[existingProductIndex].quantity += product.quantity;
    } else {
      cartItems.push(product);
    }

    LocalStorageService.storeData(LocalStorageService.CART_KEY, cartItems);
  }

  static clearCart(): void {
    LocalStorageService.storeData(LocalStorageService.CART_KEY, []);
  }

  static getCart(): UserCartItemResponse[] | null {
    return LocalStorageService.getData<UserCartItemResponse[]>(
      LocalStorageService.CART_KEY
    );
  }

  static addRecentlyViewedProduct(product: ProductItem): void {
    if (!LocalStorageService.isBrowser()) return;

    try {
      let viewedProducts =
        LocalStorageService.getRecentlyViewedProducts() || [];
      // Check if product already exists and remove it
      viewedProducts = viewedProducts.filter((p) => p.id !== product.id);
      // Add new product to the front of the array
      viewedProducts.unshift(product);
      // Keep only the last 10 items
      viewedProducts = viewedProducts.slice(0, 10);
      LocalStorageService.storeData(
        LocalStorageService.RECENTLY_VIEWED_KEY,
        viewedProducts
      );
    } catch (error) {
      console.error(`Error adding recently viewed product: ${error}`);
    }
  }

  static getRecentlyViewedProducts(): ProductItem[] | null {
    return LocalStorageService.getData<ProductItem[]>(
      LocalStorageService.RECENTLY_VIEWED_KEY
    );
  }

  static cartItemCount(): number {
    const cartItems = LocalStorageService.getCart();
    return cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;
  }
}
