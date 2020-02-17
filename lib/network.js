exports.add_retweeted = function(tweet) {
		 try {
		  nodes.add({
		     id: tweet.id_str,
		     shape: 'circularImage',
			   label: tweet.screen_name,
			   image: tweet.profile_image,
			   relation: 'retweeted'
		  }); 
		}
		catch(error) {
		  console.error(error);
		}
		try {
			   nodes.add({
				   id: tweet.sub_id_str,
				   shape: 'circularImage',
				   label: tweet.sub_screen_name,
				   image: tweet.sub_profile_image,
				   relation: 'retweeted'
			  });  
			  edges.add({
				   id: tweet.sub_id_str,
				   type: 'arrow',
				   from: 1, // TODO C'est ici qu'il y a quelque chose à faire pour ameliorer le programme! 
				   to: tweet.sub_id_str,
				   arrows: 'from' 
			  }); 
		}
		catch(error) {
		  console.error(error);
		}
		try {
		  edges.add({
		       id: a++,
		       from: tweet.id_str,
			   to: tweet.sub_id_str,
			   color:{color:'red'},
			   arrows: 'from'
		  }); 
		}
		catch(error) {
		  console.error(error);
		} 	
}

exports.add_quoted = function(tweet) {
		try {
		  nodes.add({
		       id: tweet.id_str,
		       shape: 'circularImage',
			   	 label: tweet.screen_name,
			     image: tweet.profile_image,
			     relation: 'quoted'
		  }); 
		}
		catch(error) {
		  console.error(error);
		}
		try {
	 	  // Update node & edges
		  nodes.add({
			   id: tweet.sub_id_str,
			   shape: 'circularImage',
			   label: tweet.sub_screen_name,
			   image: tweet.sub_profile_image,
			   relation: 'quoted' 
		  });
		  edges.add({
			   id: a++,
			   type: 'arrow',
			   from: 1,
			   to: tweet.sub_id_str,
			   arrows: 'from'
		  }); 
		}
		catch(error) {
		  console.error(error);
		}
		try { 
		  edges.add({
			   id: a++,
			   type: 'arrow',
			   from: tweet.id_str,
			   to: tweet.sub_id_str,
			   color:{color:'green'},
			   arrows: 'from'
		  }); 
		}
		catch(error) {
		  console.log('quoted_status node ');
		  console.error(error);
		}
}

exports.add_twitted = function(tweet) {
		  try {
				nodes.add({
				     id: tweet.id_str,
				     shape: 'circularImage',
					   label: tweet.screen_name,
					 	 image: tweet.profile_image,
					 	 relation: 'tweet'
				});
		  } catch(error) {
			  console.error(error);
			}  
		  try {
				edges.add({
				     id: a++,
					 	 type: 'arrow',
				     from: 1, // TODO C'est ici qu'il y a quelque chose à faire pour ameliorer le programme! 
					   to: tweet.id_str,
	 			     arrows: 'from'
				});
				} catch(error) {
					console.log('Main tweet ');
					console.error(error);
				}  
}
/*
exports.add_reply = function(tweet) {
		//console.log(tweet);
		Twitter.get('users/show/:user_id', { user_id: tweet.in_reply_to_user_id_str }, function (err, data, response) {
			console.log(data);
		try {
		  nodes.add({
		       id: tweet.id_str,
		       shape: 'circularImage',
			   label: tweet.user.screen_name,
			   image: tweet.user.profile_image_url_https 
		  }); 
		}
		catch(error) {
		  console.error(error);
		}
		try {
	 	  // Update node & edges
		  //console.log(tweet.quoted_status_id_str);
		  nodes.add({
			   id: tweet.in_reply_to_status_id,
			   shape: 'circularImage',
			   label: data.screen_name,
			   image: data.profile_image_url_https 
		  });  
		  edges.add({
			   id: a++,
			   type: 'arrow',
			   from: tweet.id_str,
			   to: tweet.in_reply_to_status_id,
			   color:{color:'violet'}
		  });
		}
		catch(error) {
		  console.error(error);
		} 
}
*/
