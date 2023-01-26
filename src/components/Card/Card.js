export const Card = ({ obj }) => {
	return (
		<li className='col-md-3'>
			<div className='card'>
				<img
					className='card-img-top'
					width='100%'
					height='150px'
					src={obj.flags.svg}
					alt=''
				/>
				<div className='card-body'>
					<h3 className='card-title'>{obj.name.common}</h3>
					<p className='card-text'>Population: {obj.population}</p>
					<p className='card-text'>Region: {obj.region}</p>
					<p className='card-text'>Capital: {obj.capital?.[0]}</p>
				</div>
			</div>
		</li>
	);
};
