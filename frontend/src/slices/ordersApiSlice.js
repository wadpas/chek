import { apiSlice } from './apiSlice'
import { ORDERS_URL, PAYPAL_URL } from '../constants'

export const orderApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createOrder: builder.mutation({
			query: (order) => ({
				url: ORDERS_URL,
				method: 'POST',
				body: order,
			}),
		}),
		getOrderDetails: builder.query({
			query: (id) => ({
				url: `${ORDERS_URL}/${id}`,
			}),
		}),
		payOrder: builder.mutation({
			query: ({ id, details }) => ({
				url: `${ORDERS_URL}/${id}/pay`,
				method: 'PUT',
				body: details,
			}),
		}),
		getPaypalClientId: builder.query({
			query: () => ({
				url: PAYPAL_URL,
			}),
		}),
		getMyOrders: builder.query({
			query: () => ({
				url: `${ORDERS_URL}/myorders`,
			}),
		}),
		getOrders: builder.query({
			query: () => ({
				url: ORDERS_URL,
			}),
		}),
		deliverOrder: builder.mutation({
			query: (id) => ({
				url: `${ORDERS_URL}/${id}/deliver`,
				method: 'PUT',
			}),
		}),
	}),
})

export const {
	useCreateOrderMutation,
	useGetOrderDetailsQuery,
	useGetMyOrdersQuery,
	useGetOrdersQuery,
	useDeliverOrderMutation,
	usePayOrderMutation,
	useGetPaypalClientIdQuery,
} = orderApiSlice
