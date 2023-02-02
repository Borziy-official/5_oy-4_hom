import { useState, useEffect, useRef } from 'react';
import { Card } from './components/Card/Card';
import Header from './components/header/header';
import './css/main.css'

function App() {
	const Input = useRef();
	const select = useRef();
	const [country, setCountry] = useState({
		isLoading: false,
		data: [],
		isError: '',
	});

	useEffect(() => {
		setCountry({
			...country,
			isLoading: true,
		});
		fetch('https://restcountries.com/v3.1/all')
			.then((res) => res.json())
			.then((data) => {
				if (data) {
					setCountry({
						...country,
						isLoading: false,
						data: data,
					});
				}
			})
			.catch((err) => {
				if (err) {
					setCountry({
						...country,
						isLoading: false,
						data: [],
						isError: err.message,
					});
				}
			});
	}, []);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		if (Input.current.value !== "") {
			fetch("https://restcountries.com/v3.1/name/" + Input.current.value)
				.then((res) => res.json())
				.then((data) => {
					if (data) {
						setCountry({
							isLoading: false,
							data: data,
						});
					}
				})
				.catch((err) => {
					setCountry({
						isLoading: false,
						data: [],
						isError: err.message,
					});
				});
		} else {
			fetch("https://restcountries.com/v3.1/all")
				.then((res) => res.json())
				.then((data) => {
					if (data) {
						setCountry({
							...country,
							isLoading: false,
							data: data,
						});
					}
				})
				.catch((err) => {
					if (err) {
						setCountry({
							...country,
							isLoading: false,
							data: [],
							isError: err.message,
						});
					}
				});
		}
	};

	const handleChange = () => {
		fetch('https://restcountries.com/v3.1/region/' + select.current.value)
			.then((res) => res.json())
			.then((data) => {
				if (data) {
					setCountry({
						isLoading: false,
						data: data,
					});
				}
			})
			.catch((err) => {
				if (err) {
					setCountry({
						...country,
						isLoading: false,
						data: [],
						isError: err.message,
					});
				}
			});
	};


	return (

		<div className='App'>
			{country.isLoading ? <h1>Loading...</h1> : ''}
			{country.isError ? <h1>{country.isError}</h1> : ''}
			{country.data.length ? (
				<div>
					<Header />
					<div className='hhh'>
						<form
							onSubmit={handleSubmit}>
							<div className='container'>
								<div className='mb-5 d-flex justify-content-between'>
									<input
										ref={Input}
										className="w-25 form-control"
										typeof="search"
										placeholder="Search"
									/>
									<select
										ref={select}
										className='form-select w-25'
										onChange={handleChange}

									>
										<option
											disabled
											selected
											value='sortby'
										>
											Sort by region
										</option>
										<option value='Africa'>Africa</option>
										<option value='America'>America</option>
										<option value='Asia'>Asia</option>
										<option value='Europe'>Europe</option>
										<option value='Oceania'>Oceania</option>
									</select>
								</div>
							</div>

						</form>

						<div className='container'>
							<ul className='row gy-4 justify-content-center list-unstyled'>
								{country.data.map((item, index) => (
									<Card key={index} obj={item} />
								))}
							</ul>
						</div>
					</div>
				</div>

			) : (
				''
			)}
		</div>
	);
}

export default App;
