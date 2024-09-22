import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const SearchBox = () => {
	const navigate = useNavigate()
	const { keyword: urlKeyword } = useParams()
	const [keyword, setKeyword] = useState(urlKeyword || '')

	return (
		<Form
			onSubmit={(e) => {
				e.preventDefault()
				if (keyword.trim()) {
					navigate(`/search/${keyword}`)
					setKeyword('')
				} else {
					navigate('/')
				}
			}}
			className="d-flex">
			<Form.Control
				type="text"
				name="q"
				onChange={(e) => setKeyword(e.target.value)}
				value={keyword}
				placeholder="Search Products..."
				className="mr-sm-2 ml-sm-5"></Form.Control>
			<Button
				type="submit"
				variant="outline-light"
				className="p-2 mx-2">
				Search
			</Button>
		</Form>
	)
}

export default SearchBox
