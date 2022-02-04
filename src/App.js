import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import MovieList from './components/MovieList';
import Wishlist from './components/Wishlist';
import Register from './components/Register';
import Login from './components/Login';
import dotenv from 'dotenv/config';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [wishlist, setWishlist] = useState([]);
	const [search, setSearch] = useState('');
	const [detailMovie, setDetailMovie] = useState([]);
	const [pageWishlist, setPageWishlist] = useState(false);
	const [pageRegister, setPageRegister] = useState(false);
	const [pageLogin, setPageLogin] = useState(false);
	const [auth, setAuth] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [token, setToken] = useState('');
	const [responseRegister, setResponseRegister] = useState('');
	const [responseLogin, setResponseLogin] = useState('');
	
	const register = () => {
		fetch(process.env.REACT_APP_BASE_URL+'/user/register', {method:'POST', headers:{'Content-Type':'application/json'},body:{'username':username, "password":password}})
		.then((response) => response.json())
		.then((response) => setResponseRegister(response.message));
	};

	const login = () => {
		fetch(process.env.REACT_APP_BASE_URL+'/user/login', {method:'POST', headers:{'Content-Type':'application/json'},body:{'username':username, 'password':password}})
		.then((response) => response.json())
		.then((response) => {
			if(response.token){
				setToken(response);
				setAuth(true);
			}
		})
	};
	
	const getDataMovies = (search) => {
		fetch(`http://www.omdbapi.com/?s=${search}&apikey=`+process.env.REACT_APP_MOVIE_KEY)
			.then((response) => response.json())
			.then((response) => {
				if(response.Search){
					setMovies(response.Search);
				}
			});
	};
	
	const getDataWishlist = () => {
		fetch(process.env.REACT_APP_BASE_URL+'/wishlist', {method:'GET', headers:{'auth-token':token}})
		.then((response) => response.json())
		.then((response) => {if(response.result) {setWishlist(response.result)}});
	};
	
	useEffect(() => {
		getDataWishlist();
	}, [auth]); 

	const updateDataWishlist = () => {
		fetch(process.env.REACT_APP_BASE_URL+'/wishlist', {method:'PATCH', headers:{'auth-token':token, 'Content-Type':'application/json'}, body:{'wishlist':wishlist}})
	};
	
	useEffect(() => {
			getDataMovies(search);
		},[search]);
	
	const addWishlist = (movie) => {
		const newWishlist = [...wishlist, movie];
		setWishlist(newWishlist);
		updateDataWishlist();
	};

	const removeWishlist = (movie) => {
		const newWishlist = wishlist.filter(
			(list) => list.imdbID !== movie.imdbID
		);
		setWishlist(newWishlist);
		updateDataWishlist();
	};
	
	if(auth === false){
		if(pageLogin === false){
			return(<Register setPageLogin={setPageLogin} setPageRegister={setPageRegister} setUsername={setUsername} setPassword={setPassword} register={register} responseRegister={responseRegister}/>);
		}else{
			return(<Login setPageRegister={setPageRegister} setPageLogin={setPageLogin} setUsername={setUsername} setPassword={setPassword} login={login} responseLogin={responseLogin} token={token}/>);
		}
	}else{
		if(pageWishlist === true){
			return (
				<>
					<Header setSearch={setSearch} setPageWishlist={setPageWishlist}/>
					<Wishlist wishlist={wishlist} removeWishlist={removeWishlist}/>
				</>
			);
		}else{
			return (
				<>
					<Header setSearch={setSearch} setPageWishlist={setPageWishlist}/>
					<MovieList movies={movies} detailMovie={detailMovie} setDetailMovie={setDetailMovie} addWishlist={addWishlist}/>
				</>
			);
		}
	}
	
	
};

export default App;