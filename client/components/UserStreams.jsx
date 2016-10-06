import React from 'react';

const UserStreams = ({streams, deleteStream, editStream}) => {
	return (
		<div>
			{ streams.map((stream) => {
				return (
					<div key={stream.id} className='col s12'>
							<div className="card blue">
								<div className="card-content white-text">
									<span className="card-title">{ stream.title }</span>
									<p>{ stream.description }</p>
								</div>
								<div className="card-action">
									<span className="badge green">{ stream.subscriberCount }</span>
									<span onClick={ () => { editStream(stream) } }>Edit Stream</span>
									<span onClick={ () => { deleteStream(stream) } }>Delete Stream</span>
								</div>
							</div>
					</div>
				)
			})}
		</div>
	)
}

export UserStreams;