import bcryptjs from 'bcryptjs'

const users = [
	{
		name: 'Nolan Gonzalez',
		email: 'admin@example.com',
		password: bcryptjs.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'Liam Garcia',
		email: 'liam.garcia@example.com',
		password: bcryptjs.hashSync('123456', 10),
	},
	{
		name: 'Ethan Thompson',
		email: 'ethan.thompson@example.com',
		password: bcryptjs.hashSync('123456', 10),
	},
	{
		name: 'Ella Cook',
		email: 'ella.cook@example.com',
		password: bcryptjs.hashSync('123456', 10),
	},
	{
		name: 'Caleb Nelson',
		email: 'caleb.nelson@example.com',
		password: bcryptjs.hashSync('123456', 10),
	},
]

export default users
