import React from 'react';
import {Link} from 'react-router';
import urlUtil from '../utils/urlHelper.jsx';
import { Button, Modal } from 'react-materialize';
import checkLength from '../utils/lengthHelper.jsx';

const UserStreams = ({streams, deleteStream, onStreamSelect, onRequestClose, editStream}) => {
	return (
		<div>
			{ streams.map((stream) => {
				return (
					<ul key={stream.id} className="collection with-header col s12 m6 l6">
						<li className="collection-header transparent componentGradient">
							<h5 className="color1-text text-lighten-5">{ checkLength(stream.title, 30) }</h5>
							<p>{ checkLength(stream.description, 50) }</p>
						</li>
						<li className="collection-item transparent componentGradient">
							<table>
								<tbody>
									<tr>
										<td><Link to={ localStorage.username + '/' + urlUtil.slugify(stream.title) }>Start Streaming</Link></td>
										<td><Modal
										  header='Modal Header'
										  trigger={
										    <a>Edit Stream</a>
										  }>
										  <div>
										  	<form onSubmit={ (e) => { editStream(e, stream) } }>
										  		<input type='text' defaultValue={ stream.title } name='title' />
										  		<input type='text' defaultValue={ stream.description } name='description' />
										  		<input type='submit' value='Submit' className='btn color1-text text-lighten-5' />
										  	</form>
										  </div>
										</Modal></td>

										<td><a onClick={ () => { deleteStream(stream); } }>Delete Stream</a></td>
										<td><i className="material-icons color1-text text-lighten-5">supervisor_account</i><br/>{ stream.subscriberCount }</td>
									</tr>
								</tbody>
							</table>
						</li>
					</ul>
				)
			})}
			<div>
				<Link to='/create' className="btn color1-text text-lighten-5">
					Create New Stream
				</Link>
			</div>
		</div>
	)
}

export default UserStreams;