import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('cart')
	? JSON.parse(localStorage.getItem('cart'))
	: {
			cartItems: [],
			shippingAddress: {},
			paymentMethod: 'PayPal',
			itemsPrice: 0,
			shippingPrice: 0,
			taxPrice: 0,
			totalPrice: 0,
	  }

const cartSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const item = action.payload
			const existItem = state.cartItems.find((x) => x._id === item._id)
			if (existItem) {
				state.cartItems = state.cartItems.map((x) => (x._id === existItem._id ? item : x))
			} else {
				state.cartItems = [...state.cartItems, item]
			}
			state.itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
			state.shippingPrice = state.itemsPrice > 100 ? 0 : 10
			state.taxPrice = (0.15 * state.itemsPrice).toFixed(2)
			state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2)

			localStorage.setItem('cart', JSON.stringify(state))
		},

		removeFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)
			localStorage.setItem('cart', JSON.stringify(state))
		},

		saveShippingAddress: (state, action) => {
			state.shippingAddress = action.payload
			localStorage.setItem('cart', JSON.stringify(state))
		},

		savePaymentMethod: (state, action) => {
			state.paymentMethod = action.payload
			localStorage.setItem('cart', JSON.stringify(state))
		},

		clearCartItems: (state) => {
			state.cartItems = []
			localStorage.removeItem('cart')
		},
	},
})

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions

export default cartSlice.reducer
