import React from 'react';
import {Link} from 'react-router';
import urlUtil from '../utils/urlHelper.jsx';
import { Button, Modal } from 'react-materialize'

const UserStreams = ({streams, deleteStream, onStreamSelect, onRequestClose, editStream}) => {
	return (
									// <a onClick={ () => { onStreamSelect(stream); } }>Edit Stream</a>
									// <a className='btn blue' onClick={ onRequestClose }>Cancel</a>
		<div>
			{ streams.map((stream) => {
				return (
					<div key={stream.id} className='col s12'>
							<div className="card">
								<div className="card-content white-text">
									<span className="card-title">{ stream.title }</span>
									<p>{ stream.description }</p>
								</div>
								<div className="card-action">
									<span className="badge">{ stream.subscriberCount }</span>
									<Link to={ localStorage.username + '/' + urlUtil.slugify(stream.title) }>Start Streaming</Link>
									<Modal
									  header='Modal Header'
									  trigger={
									    <a>Edit Stream</a>
									  }>
									  <div>
									  	<form onSubmit={ (e) => { editStream(e, stream) } }>
									  		<input type='text' defaultValue={ stream.title } name='title' />
									  		<input type='text' defaultValue={ stream.description } name='description' />
									  		<input type='submit' value='Submit' className='btn' />
									  	</form>
									  </div>
									</Modal>
									<a onClick={ () => { deleteStream(stream); } }>Delete Stream</a>
								</div>
							</div>
					</div>
				)
			})}
			<div>
				<Link to='/create'>
					<h5>Create new stream</h5>
				</Link>
			</div>
		</div>
	)
}

export default UserStreams;