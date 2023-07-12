import productsReducer, { updateProducts } from '../utils/productsSlice';
import categoriesReducer, { updateCategories, updateCurrentCategory } from '../utils/categoriesSlice';
import cartReducer, {
  addToCart,
  addMultipleToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  toggleCart
} from '../utils/cartSlice';

const initialState = {
  products: [],
  cart: [
    {
      _id: '1',
      name: 'Soup',
      purchaseQuantity: 1
    },
    {
      _id: '2',
      name: 'Bread',
      purchaseQuantity: 2
    }
  ],
  cartOpen: false,
  categories: [{ name: 'Food' }],
  currentCategory: '1',
};

test('UPDATE_PRODUCTS', () => {
  const initialState = [];
  const newState = productsReducer(initialState, updateProducts([{}, {}]));
  
  expect(newState.length).toBe(2);
  expect(initialState.length).toBe(0);
});

test('ADD_TO_CART', () => {
  const initialState = {
    entries: [{
      _id: '1',
      name: 'Soup',
      purchaseQuantity: 1
    }, {
      _id: '2',
      name: 'Bread',
      purchaseQuantity: 2
    }],
    cartOpen: false
  };
  const newState = cartReducer(initialState, addToCart({
    product: { 
      _id: '3', 
      name: 'Crackers', 
      purchaseQuantity: 1 
    }
  }));

  expect(newState.entries.length).toBe(3);
  expect(initialState.entries.length).toBe(2);

  expect(newState.cartOpen).toBe(true);
  expect(initialState.cartOpen).toBe(false);
});

test('UPDATE_CART_QUANTITY', () => {
  const initialState = {
    entries: [{
      _id: '1',
      name: 'Soup',
      purchaseQuantity: 1
    }, {
      _id: '2',
      name: 'Bread',
      purchaseQuantity: 2
    }],
    cartOpen: false
  };
  const newState = cartReducer(initialState, updateCartQuantity({
    _id: '1',
    purchaseQuantity: 3
  }));

  expect(newState.entries[0].purchaseQuantity).toBe(3);
  expect(initialState.entries[0].purchaseQuantity).toBe(1);
  expect(newState.entries[1].purchaseQuantity).toBe(2);
  
  expect(newState.cartOpen).toBe(true);
  expect(initialState.cartOpen).toBe(false);
});

test('REMOVE_FROM_CART', () => {
  const initialState = {
    entries: [{
      _id: '1',
      name: 'Soup',
      purchaseQuantity: 1
    }, {
      _id: '2',
      name: 'Bread',
      purchaseQuantity: 2
    }],
    cartOpen: false
  };
  const newState1 = cartReducer(initialState, removeFromCart('1'));

  expect(newState1.cartOpen).toBe(true);
  expect(newState1.entries.length).toBe(1);
  expect(newState1.entries[0]._id).toBe('2');

  let newState2 = cartReducer(newState1, removeFromCart('2'));

  expect(newState2.cartOpen).toBe(false);
  expect(newState2.entries.length).toBe(0);

  expect(initialState.entries.length).toBe(2);
});

test('ADD_MULTIPLE_TO_CART', () => {
  const initialState = {
    entries: [{
      _id: '1',
      name: 'Soup',
      purchaseQuantity: 1
    }, {
      _id: '2',
      name: 'Bread',
      purchaseQuantity: 2
    }],
    cartOpen: false
  };
  const newState = cartReducer(initialState, addMultipleToCart([{}, {}]));

  expect(newState.cart.length).toBe(4);
  expect(initialState.cart.length).toBe(2);
});

test('UPDATE_CATEGORIES', () => {
  const initialState = {
    entries: ['food'],
    current: ''
  };
  const newState = categoriesReducer(initialState, updateCategories(['food', 'books']));
  
  expect(newState.entries.length).toBe(2);
  expect(initialState.entries.length).toBe(1);
  expect(newState.current).toBe('');
});

test('UPDATE_CURRENT_CATEGORY', () => {
  const initialState = {
    entries: ['food', 'books'],
    current: 'food'
  };
  const newState = categoriesReducer(initialState, updateCurrentCategory('books'));

  expect(newState.current).toBe('books');
  expect(initialState.current).toBe('food');
});

test('CLEAR_CART', () => {
  const initialState = {
    entries: [{
      _id: '1',
      name: 'Soup',
      purchaseQuantity: 1
    }, {
      _id: '2',
      name: 'Bread',
      purchaseQuantity: 2
    }],
    cartOpen: false
  };
  const newState = cartReducer(initialState, clearCart());

  expect(newState.cartOpen).toBe(false);
  expect(newState.entries.length).toBe(0);
  expect(initialState.entries.length).toBe(2);
});

test('TOGGLE_CART', () => {
  const initialState = {
    entries: [{
      _id: '1',
      name: 'Soup',
      purchaseQuantity: 1
    }, {
      _id: '2',
      name: 'Bread',
      purchaseQuantity: 2
    }],
    cartOpen: false
  };
  const newState = cartReducer(initialState, toggleCart());

  expect(newState.cartOpen).toBe(true);
  expect(initialState.cartOpen).toBe(false);
  
  const newState2 = cartReducer(newState, toggleCart());

  expect(newState2.cartOpen).toBe(false);
});
