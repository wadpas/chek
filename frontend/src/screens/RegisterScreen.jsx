import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'

import React from 'react'

const RegisterScreen = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [register, { isLoading }] = useRegisterMutation()
	const { userInfo } = useSelector((state) => state.auth)
	const { search } = useLocation()
	const sp = new URLSearchParams(search)
	const redirect = sp.get('redirect') || '/'

	useEffect(() => {
		if (userInfo) {
			navigate(redirect)
		}
	}, [navigate, redirect, userInfo])

	const submitHandler = async (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			toast.error('Passwords do not match')
		}

		try {
			const res = await register({ name, email, password }).unwrap()
			dispatch(setCredentials({ ...res }))
			navigate(redirect)
		} catch (error) {
			toast.error(error?.data?.message || error.message)
		}
	}

	return (
		<Row className="justify-content-md-center mt-5">
			<Col md={6}>
				<h1>Sign Up</h1>
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter name"
							value={name}
							onChange={(e) => setName(e.target.value)}></Form.Control>
					</Form.Group>
					<Form.Group
						className="my-3"
						controlId="email">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}></Form.Control>
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}></Form.Control>
					</Form.Group>
					<Form.Group className="my-3">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirm password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
					</Form.Group>
					<Button
						type="submit"
						variant="primary"
						disabled={isLoading}>
						Register
					</Button>
					{isLoading && <Loader />}
				</Form>
				<Row className="py-3">
					<Col>
						Already have an account?{' '}
						<Link
							className="text-info"
							to={redirect ? `/login?redirect=${redirect}` : '/login'}>
							Login
						</Link>
					</Col>
				</Row>
			</Col>
		</Row>
	)
}

export default RegisterScreen
