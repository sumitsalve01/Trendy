import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import products from './data/products.js';
import users from './data/users.js';
import Order from './models/orderModel.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';

dotenv.config();

connectDB();

const importData = async () => {
	try {
		await Order.deleteMany();
		await User.deleteMany();
		await Product.deleteMany();

		const createdUsers = await User.insertMany(users);
		const adminUser = createdUsers[0]._id;
		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser };
		});
		await Product.insertMany(sampleProducts);

		console.log('Data imported'.green.inverse);
		process.exit();
	} catch (err) {
		console.error(`${err}`.red.inverse);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await Order.deleteMany();
		await User.deleteMany();
		await Product.deleteMany();

		console.log('Data destroyed'.red.inverse);
		process.exit();
	} catch (er) {
		console.error(`${err}`.red.inverse);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}
