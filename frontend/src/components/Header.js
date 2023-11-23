import {
	Box,
	Button,
	Flex,
	Heading,
	Icon,
	Link,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import { useState } from 'react';
import { HiMenuAlt3, HiShoppingBag, HiUser } from 'react-icons/hi';
import { IoChevronDown } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { logout } from '../actions/userActions';

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [show, setShow] = useState(false);

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
		navigate('/login');
	};

	return (
		<Flex
			as='header'
			align='center'
			justifyContent='space-between'
			wrap='wrap'
			py='6'
			px='6'
			bgColor='gray.800'
			w='100%'
			pos='fixed'
			top='0'
			left='0'
			zIndex='99999'>
			<Link as={RouterLink} to='/'>
				<Heading
					as='h1'
					color='whiteAlpha.800'
					fontWeight='bold'
					size='md'
					letterSpacing='wide'>
					Trendzz Store
				</Heading>
			</Link>

			{/* Menu Icon */}
			<Box
				display={{ base: 'flex', md: 'none' }}
				onClick={() => setShow(!show)}>
				<Icon as={HiMenuAlt3} color='white' w='6' h='6' />
			</Box>

			<Box
				display={{ base: show ? 'block' : 'none', md: 'flex' }}
				width={{ base: 'full', md: 'auto' }}
				mt={{ base: '5', md: '0' }}>
				<Link
					as={RouterLink}
					to='/cart'
					fontSize='sm'
					letterSpacing='wide'
					textTransform='uppercase'
					ml={{ base: '0', md: '5' }}
					color='whiteAlpha.800'
					display='flex'
					alignItems='center'
					mt={{ base: '2', md: '0' }}
					_hover={{ textDecor: 'none', color: 'whiteAlpha.600' }}>
					<Icon as={HiShoppingBag} w='4' h='4' mr='1' />
					Cart
				</Link>

				{userInfo ? (
					<Menu>
						<MenuButton
							ml='4'
							as={Button}
							rightIcon={<IoChevronDown />}
							_hover={{ textDecor: 'none', opacity: '0.7' }}>
							{userInfo.name}
						</MenuButton>
						<MenuList>
							<MenuItem as={RouterLink} to='/profile'>
								Profile
							</MenuItem>
							<MenuItem onClick={logoutHandler}>Logout</MenuItem>
						</MenuList>
					</Menu>
				) : (
					<Link
						as={RouterLink}
						to='/login'
						fontSize='sm'
						letterSpacing='wide'
						textTransform='uppercase'
						ml={{ base: '0', md: '5' }}
						color='whiteAlpha.800'
						display='flex'
						alignItems='center'
						mt={{ base: '2', md: '0' }}
						_hover={{ textDecor: 'none', color: 'whiteAlpha.600' }}>
						<Icon as={HiUser} w='4' h='4' mr='1' />
						Login
					</Link>
				)}

				{/* Admin Menu */}
				{userInfo && userInfo.isAdmin && (
					<Menu>
						<MenuButton
							ml='3'
							as={Button}
							rightIcon={<IoChevronDown />}
							_hover={{ textDecor: 'none', opacity: '0.7' }}>
							Manage
						</MenuButton>
						<MenuList>
							<MenuItem as={RouterLink} to='/admin/userlist'>
								All Users
							</MenuItem>
							<MenuItem as={RouterLink} to='/admin/productlist'>
								All Products
							</MenuItem>
							<MenuItem as={RouterLink} to='/admin/orderlist'>
								All Orders
							</MenuItem>
						</MenuList>
					</Menu>
				)}
			</Box>
		</Flex>
	);
};

export default Header;
