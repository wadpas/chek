import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {
	useGetProductDetailsQuery,
	useUpdateProductMutation,
	useUploadProductImageMutation,
} from '../slices/productsApiSlice'
import { toast } from 'react-toastify'

const ProductEditScreen = () => {
	const { id: productId } = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [image, setImage] = useState('')
	const [brand, setBrand] = useState('')
	const [category, setCategory] = useState('')
	const [countInStock, setCountInStock] = useState(0)
	const [description, setDescription] = useState('')

	const { data: product, isLoading, error } = useGetProductDetailsQuery(productId)
	const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation()
	const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation()

	useEffect(() => {
		if (product) {
			setName(product.name)
			setPrice(product.price)
			setImage(product.image)
			setBrand(product.brand)
			setCategory(product.category)
			setCountInStock(product.countInStock)
			setDescription(product.description)
		}
	}, [product])

	const submitHandler = async (e) => {
		e.preventDefault()
		const updatedProduct = {
			productId,
			name,
			price,
			image,
			brand,
			category,
			description,
			countInStock,
		}
		const result = await updateProduct(updatedProduct)
		if (result.error) {
			toast.error(result.error)
		} else {
			toast.success('Product successfully updated')
			navigate('/admin/productlist')
		}
	}

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append('image', file)
		try {
			const res = await uploadProductImage(formData).unwrap()
			setImage(res.image)
			toast.success('Image successfully uploaded')
		} catch (err) {
			toast.error(err)
		}
	}

	return (
		<>
			<Link
				to="/admin/productlist"
				className="btn btn-light my-3">
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Product</h1>
				{loadingUpdate && <Loader />}
				{error && <Message variant="danger">{error}</Message>}
				{isLoading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group
							className="mb-2"
							controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter name"
								value={name}
								onChange={(e) => setName(e.target.value)}></Form.Control>
						</Form.Group>

						<Form.Group
							className="mb-2"
							controlId="price">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter price"
								value={price}
								onChange={(e) => setPrice(e.target.value)}></Form.Control>
						</Form.Group>

						<Form.Group
							className="mb-2"
							controlId="image">
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter image url"
								value={image}
								onChange={(e) => setImage(e.target.value)}></Form.Control>
							<Form.Control
								type="file"
								label="Choose File"
								onChange={uploadFileHandler}></Form.Control>
							{loadingUpload && <Loader />}
						</Form.Group>

						<Form.Group
							className="mb-2"
							controlId="brand">
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter brand"
								value={brand}
								onChange={(e) => setBrand(e.target.value)}></Form.Control>
						</Form.Group>

						<Form.Group
							className="mb-2"
							controlId="countInStock">
							<Form.Label>Count In Stock</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter countInStock"
								value={countInStock}
								onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
						</Form.Group>

						<Form.Group
							className="mb-2"
							controlId="category">
							<Form.Label>Category</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}></Form.Control>
						</Form.Group>

						<Form.Group
							className="mb-2"
							controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}></Form.Control>
						</Form.Group>

						<Button
							type="submit"
							variant="primary">
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	)
}

export default ProductEditScreen
