import React from 'react';

const isSubscribed = (stream, subscriptions, removeSubscription, addSubscription) => {
  if (subscriptions.includes(stream.title)) {
    return (
      <i onClick={ () => { removeSubscription(stream) } } 
         className='material-icons circle teal'>
         done
      </i>
    );
  }
  return (
    <i onClick={ () => { addSubscription(stream) } } 
       className='material-icons circle'>
       done
    </i>
  );
}

export default isSubscribed;