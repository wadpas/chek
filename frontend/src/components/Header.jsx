import { Badge, Navbar, Nav, Container } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import logo from '../assets/logo.svg'

const Header = () => {
	const { cartItems } = useSelector((state) => state.cart)

	return (
		<header>
			<Navbar
				bg="dark"
				variant="dark"
				expand="lg"
				collapseOnSelect>
				<Container>
					<Navbar.Brand
						as={Link}
						to="/">
						<img
							height="36"
							src={logo}
							alt="chek"></img>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<Nav.Link
								as={Link}
								to="/cart">
								<FaShoppingCart /> Cart
								{cartItems.length > 0 && (
									<Badge
										pill
										bg="success">
										{cartItems.reduce((acc, item) => acc + item.qty, 0)}
									</Badge>
								)}
							</Nav.Link>
							<Nav.Link
								as={Link}
								to="/login">
								<FaUser /> Sign In
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

export default Header
