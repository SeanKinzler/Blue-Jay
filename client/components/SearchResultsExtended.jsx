import React from 'react';
import { Modal, Button } from 'react-materialize';
import checkLength from '../utils/lengthHelper.jsx';
const SearchResultsExtended = ({searchResults, openModal, addSubscription, removeSubscription, subscriptions}) => {

	const isSubscribed = (stream) => {
		if (subscriptions.includes(stream.title)) {
			return <i onClick={ () => { removeSubscription(stream) } } className='material-icons circle color1 lighten-3 color1-text text-darken-3'>done</i>;
		}
		return <i onClick={ () => { addSubscription(stream) } } className='material-icons circle color1-text text-lighten-5'>done</i>;
	}

	const isOnline = (stream) => {
		if (stream.online === 'true') {
			return <i className="material-icons color1-text text-lighten-5">volume_up</i>;
		} else {
			return <i className="material-icons color1-text text-lighten-5">volume_off</i>;
		}
	}

	return (
		<div>
			{ searchResults.map((stream) => {
				return (
				<ul key={stream.id} className="collection with-header col s12 transparent">
				  <li className="collection-header transparent componentGradient">
				  	<h5>{ checkLength(stream.title, 50)}</h5>
				  	<p>{stream.description}</p>
				  </li>
				  <li className="collection-item transparent componentGradient">
				  	<table className='centered'>
				  		<tbody>
				  			<tr>
									<td>{ isSubscribed(stream) }</td>
									<td>
										<Modal
										  header={ stream.title }
										  trigger={
										    <Button onClick={ () => { openModal(stream); } } waves='light'>Details</Button>
										  }>
										  <div>
												<p>Description: { checkLength(stream.description, 60) }</p>
												<p>Subscriber count: { stream.subscriberCount }</p>
												<p>Online: { stream.online }</p>
												<p>Creator: { checkLength(stream.creatorName, 60) }</p>
										  </div>
										</Modal>
									</td>
									<td>Creator:<br/>{ checkLength(stream.creatorName, 50) }</td>
									<td>{ isOnline(stream) }</td>
									<td><i className="material-icons color1-text text-lighten-5">supervisor_account</i><br/>{ stream.subscriberCount }</td>
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