import { createSlice } from '@reduxjs/toolkit';
import { maxBarItemPerCart } from 'constants.js';
import { toast } from 'react-toastify';

const initialState = {
  barCartItems: localStorage.getItem('barCartItems') ? JSON.parse(localStorage.getItem('barCartItems')) : [],
  barCartTotalQuantity: 0,
  barCartTotalAmount: 0,
};

const barCartSlice = createSlice({
  name: 'barCart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.barCartItems.findIndex((item) => item.item_id === action.payload.item_id);

      if (existingIndex >= 0) {
        if (state.barCartItems[existingIndex].barCartTotalQuantity + 1 <= maxBarItemPerCart) {
          state.barCartItems[existingIndex] = {
            ...state.barCartItems[existingIndex],
            barCartTotalQuantity: state.barCartItems[existingIndex].barCartTotalQuantity + 1,
          };
          toast.info('Increased Bar Item quantity', {
            position: 'top-right',
          });
        } else {
          toast.error(`You can't add more than ${maxBarItemPerCart}`, {
            position: 'top-right',
          });
        }
      } else {
        const tempProductItem = { ...action.payload, barCartTotalQuantity: 1 };
        state.barCartItems.push(tempProductItem);
        toast.success('Bar Item added to cart', {
          position: 'top-right',
        });
      }
      localStorage.setItem('barCartItems', JSON.stringify(state.barCartItems));
    },
    decreaseCart(state, action) {
      const itemIndex = state.barCartItems.findIndex((item) => item.item_id === action.payload.item_id);

      if (state.barCartItems[itemIndex].barCartTotalQuantity > 1) {
        state.barCartItems[itemIndex].barCartTotalQuantity -= 1;

        toast.error('Decreased Bar Item quantity', {
          position: 'top-right',
        });
      } else if (state.barCartItems[itemIndex].barCartTotalQuantity === 1) {
        const nextbarCartItems = state.barCartItems.filter((item) => item.item_id !== action.payload.item_id);

        state.barCartItems = nextbarCartItems;

        toast.error('Bar Item removed from cart', {
          position: 'top-right',
        });
      }

      localStorage.setItem('barCartItems', JSON.stringify(state.barCartItems));
    },
    removeFromCart(state, action) {
      state.barCartItems.map((cartItem) => {
        if (cartItem.item_id === action.payload.item_id) {
          const nextbarCartItems = state.barCartItems.filter((item) => item.item_id !== cartItem.item_id);

          state.barCartItems = nextbarCartItems;

          toast.error('Bar Item removed from cart', {
            position: 'top-right',
          });
        }
        localStorage.setItem('barCartItems', JSON.stringify(state.barCartItems));
        return state;
      });
    },
    getTotals(state, action) {
      // eslint-disable-next-line prefer-const
      let { total, quantity } = state.barCartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, barCartTotalQuantity } = cartItem;
          const itemTotal = price * barCartTotalQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += barCartTotalQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.barCartTotalQuantity = quantity;
      state.barCartTotalAmount = total;
    },
    clearCart(state, action) {
      state.barCartItems = [];
      localStorage.setItem('barCartItems', JSON.stringify(state.barCartItems));
      toast.error('Cart cleared', { position: 'top-right' });
    },
    completeCart(state, action) {
      state.barCartItems = [];
      localStorage.setItem('barCartItems', JSON.stringify(state.barCartItems));
    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart, completeCart } = barCartSlice.actions;

export default barCartSlice.reducer;
