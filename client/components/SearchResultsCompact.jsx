import React from 'react';
import { Button, Modal } from 'react-materialize'
import { SearchResultsModal } from './SearchResultsModal.jsx'
import style from '../styles.js'

const SearchResultsCompact = ({searchResults, openModal, addSubscription, selectedStream, removeSubscription, modalIsOpen, onRequestClose, subscriptions}) => {
	const isSubscribed = (stream) => {
		if (subscriptions.includes(stream.title)) {
			return <i onClick={ () => { removeSubscription(stream) } } className='material-icons circle green'>done</i>;
		}
		return <i onClick={ () => { addSubscription(stream) } } className='material-icons circle'>done</i>;
	}

	const isOnline = (stream) => {
		if (stream.online === 'true') {
			return <i className="material-icons">volume_up</i>;
		} else {
			return <i className="material-icons">volume_off</i>;
		}
	}

	const checkLength = (string, length) => {
	  if (string === null || string === undefined) {string = ''}
	  if (string.length >= length) {
	    return string.slice(0, length) + '...';
	  } else {
	    return string;
	  }
	};

	///<div onClick={ () => { openModal(stream); } } className='btn'>Details</div>
	return (
		<div>
			{ 
				searchResults.map((stream) => {
					return (
						<ul key={stream.id} className="collection with-header col s12 m6 l6">
						  <li className="collection-header">
						  	<h5>{ checkLength(stream.title, 23) }</h5>
						  </li>
						  <li className="collection-item">
				  	  	<table className='centered'>
				  	  		<tbody>
				  	  			<tr>
				  						<td>{ isSubscribed(stream) }</td>
				  						<td>
				  							<Modal
				  							  header={ checkLength(stream.title, 23) }
				  							  trigger={
				  							    <Button onClick={ () => { openModal(stream); } } waves='light'>Details</Button>
				  							  }>
				  							  <div>
				  									<p>Description: { checkLength(stream.description, 60)  }</p>
				  									<p>Subscriber count: { stream.subscriberCount }</p>
				  									<p>Online: { stream.online }</p>
				  									<p>Creator: { checkLength(stream.creatorName, 60) }</p>
				  							  </div>
				  							</Modal>
				  						</td>
				  						<td>{ isOnline(stream) }</td>
				  						<td><i className="material-icons">supervisor_account</i><br/>{ stream.subscriberCount }</td>
				  	  			</tr>
				  	  		</tbody>
				  	  	</table>
						  </li>
						</ul>
					);
				}) 
			}
		</div>
	)
}

export default SearchResultsCompact;