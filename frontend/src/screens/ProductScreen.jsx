import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'

const ProductScreen = () => {
	const { id: productId } = useParams()
	const product = products.find((p) => p._id === Number(productId))

	return (
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
								text={`${product.reviews.length}`}></Rating>
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
