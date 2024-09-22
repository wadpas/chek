import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productsApiSlice'
import { addToCart } from '../slices/cartSlice'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'

const ProductScreen = () => {
	const { id: productId } = useParams()
	const [qty, setQty] = useState(1)
	const [rating, setRating] = useState(0)
	const [comment, setComment] = useState('')

	const { userInfo } = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { data: product, refetch, isLoading, error } = useGetProductDetailsQuery(productId)
	const [createReview, { isLoading: loadingReview }] = useCreateReviewMutation()
	const addToCartHandler = () => {
		dispatch(addToCart({ ...product, qty }))
		navigate('/cart')
	}
	const submitHandler = async (e) => {
		e.preventDefault()
		try {
			await createReview({ productId, rating, comment }).unwrap()
			refetch()
			toast.success('Review submitted successfully')
		} catch (error) {
			toast.error(error?.data?.message || error.message)
		}
	}

	return isLoading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error?.data?.message || error.message}</Message>
	) : (
		<>
			<Link
				to="/"
				className="btn btn-light my-3">
				Go Back
			</Link>
			<Row>
				<Meta title={product.name} />
				<Col md={5}>
					<Image
						src={product.images[0]}
						alt={product.name}
						fluid
					/>
				</Col>
				<Col md={4}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h3>{product.name}</h3>
						</ListGroup.Item>
						<ListGroup.Item>
							<Rating
								value={product.rating}
								text={product.rating}></Rating>
						</ListGroup.Item>
						<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
						<ListGroup.Item>Description: {product.description}</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup variant="flash">
							<ListGroup.Item>
								<Row>
									<Col>Price:</Col>
									<Col>
										<strong>${product.price}</strong>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Status:</Col>
									<Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
								</Row>
								{product.countInStock > 0 && (
									<Row className="mt-2">
										<Col>Qty:</Col>
										<Col>
											<select
												value={qty}
												onChange={(e) => setQty(Number(e.target.value))}>
												{[...Array(product.countInStock).keys()].map((x) => (
													<option
														key={x + 1}
														value={x + 1}>
														{x + 1}
													</option>
												))}
											</select>
										</Col>
									</Row>
								)}
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									className="btn-block"
									type="button"
									disabled={product.countInStock === 0}
									onClick={addToCartHandler}>
									Add to Cart
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col md={6}>
					<h2>Reviews</h2>
					{product.reviews.length === 0 && <Message>No reviews</Message>}
					<ListGroup variant="flush">
						{product.reviews.map((review) => (
							<ListGroup.Item key={review._id}>
								<strong>{review.name}</strong>
								<Rating value={review.rating} />
								<p>{review.createdAt.substring(0, 10)}</p>
								<p>{review.comment}</p>
							</ListGroup.Item>
						))}
						<ListGroup.Item>
							<h2>Write a Customer Review</h2>
							{loadingReview && <Loader />}
							{userInfo ? (
								<Form onSubmit={submitHandler}>
									<Form.Group controlId="rating">
										<Form.Label>Rating</Form.Label>
										<Form.Control
											as="select"
											value={rating}
											onChange={(e) => setRating(e.target.value)}>
											<option value="">Select...</option>
											<option value="1">1 - Poor</option>
											<option value="2">2 - Fair</option>
											<option value="3">3 - Good</option>
											<option value="4">4 - Very Good</option>
											<option value="5">5 - Excellent</option>
										</Form.Control>
									</Form.Group>
									<Form.Group controlId="comment">
										<Form.Label>Comment</Form.Label>
										<Form.Control
											as="textarea"
											row="3"
											value={comment}
											onChange={(e) => setComment(e.target.value)}></Form.Control>
									</Form.Group>
									<Button
										className="mt-2"
										type="submit"
										variant="primary">
										Submit
									</Button>
								</Form>
							) : (
								<Message>
									Please <Link to="/login">sign in</Link> to write a review
								</Message>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
		</>
	)
}

export default ProductScreen
