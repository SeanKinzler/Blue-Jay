import React from 'react';
import { Modal, Button } from 'react-materialize';

const SearchResultsExtended = ({searchResults, openModal, addSubscription, subscriptions}) => {
	const isSubscribed = (stream) => {

	}

	const isOnline = (stream) => {
		if (stream.online === 'true') {
			return <i className="material-icons">volume_up</i>;
		} else {
			return <i className="material-icons">volume_off</i>;
		}
	}
	return (
		<div>
			{ searchResults.map((stream) => {
				return (
				<ul key={stream.title} className="collection with-header col s12">
				  <li className="collection-header">
				  	<h5>{stream.title}</h5>
				  	<p>{stream.description}</p>
				  </li>
				  <li className="collection-item">
				  	<table className='centered'>
				  		<tbody>
				  			<tr>
									<td><i onClick={ () => { addSubscription(stream) } } className='material-icons circle green'>done</i></td>
									<td>
										<Modal
										  header={ stream.title }
										  trigger={
										    <Button onClick={ () => { openModal(stream); } } waves='light'>Details</Button>
										  }>
										  <div>
												<p>Description: { stream.description }</p>
												<p>Subscriber count: { stream.subscriberCount }</p>
												<p>Online: { stream.online }</p>
												<p>CreatorId: { stream.CreatorId }</p>
												<p>Created: { stream.createdAt }</p>
										  </div>
										</Modal>

									</td>
									<td>Creator:<br/>{ stream.creatorId }</td>
									<td>{ isOnline(stream) }</td>
									<td><i className="material-icons">supervisor_account</i><br/>{ stream.subscriberCount }</td>
				  			</tr>
				  		</tbody>
				  	</table>
				  </li>
				</ul>
				)
			})}
		</div>
	)
}

export default SearchResultsExtended;