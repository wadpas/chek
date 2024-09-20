import { apiSlice } from './apiSlice'
import { ORDERS_URL } from '../constants'

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
		getUserOrders: builder.query({
			query: () => ({
				url: `${ORDERS_URL}/user/myorders`,
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
	useGetUserOrdersQuery,
	useGetOrdersQuery,
	useDeliverOrderMutation,
} = orderApiSlice
