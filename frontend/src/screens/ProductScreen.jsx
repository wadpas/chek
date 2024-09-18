import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap'
import { useGetProductDetailsQuery } from '../slices/productsApiSlice'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = () => {
	const { id: productId } = useParams()
	const { data: product, isLoading, error } = useGetProductDetailsQuery(productId)

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
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								className="btn-block"
								type="button"
								disabled={product.countInStock === 0}>
								Add to Cart
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
		</>
	)
}

export default ProductScreen
