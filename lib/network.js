function check(array, key, value) {
    return array.some(object => object[key] === value);
}

exports.add_retweeted = function(tweet) {

		 try {
		  nodes.add({
		     id: tweet.id_str,
		     shape: 'circularImage',
			   label: tweet.screen_name,
			   image: tweet.profile_image,
			   relation: 'retweeted'   
		  }); 
			var retweetStats = retweet++
			$('#retweetStats').html(retweetStats) 
		  $('#TwitNode').html(TwitNode++)
		  
		  /*edges.add({
		     id: a++,
		     from: tweet.id_str,
			   to: tweet.sub_id_str,
			   color:{color:'yellow'},
			   arrows: 'from'
		  });
		  $('#TwitEdge').html(TwitEdge++) 		  */
		  
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
			  $('#TwitNode').html(TwitNode++)
				var tweetStats = tweets++
				$('#tweetStats').html(tweetStats)	  
			  //network.stabilize(tweet.id_str)
			  edges.add({
				   id: tweet.sub_id_str,
				   type: 'arrow',
				   from: 1, // TODO C'est ici qu'il y a quelque chose à faire pour ameliorer le programme! 
				   to: tweet.sub_id_str,
				   arrows: 'from' 
			  });
			  $('#TwitEdge').html(TwitEdge++)			  
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
		  $('#TwitEdge').html(TwitEdge++) 
		}
		catch(error) {
		  console.error(error);
		} 		
		
		// Hastag part
		if (tweet.streamHashtag.length > 0) {
			//console.log(tweet.streamHashtag);
			
			
				tweet.streamHashtag.forEach((item3, index) => {
					//console.log(item.text);
					//console.log(check(tweet.hashTagVar, 'name', item3.text));
 
					if (!check(tweet.hashTagVar, 'name', item3.text)) {
 	 					 			
					} else {							
						tweet.hashTagVar.forEach((item4, index) => {
							//console.log(item4);
							//console.log(item3);
							if (item4.name === item3.text) {
								edges.add({
									 id: a++,
									 type: 'arrow',
									 from: tweet.id_str,
									 to: item4.idNode,
									 arrows: 'from'
								});
								$('#TwitEdge').html(TwitEdge++) 
							}
							
						})

  						
					}		 						
				})					
		}
		//network.stabilize() 
		
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
		  $('#TwitNode').html(TwitNode++)
				var quoteStats = quote++
				$('#quoteStats').html(quoteStats)		
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
		  $('#TwitNode').html(TwitNode++)
		  edges.add({
			   id: a++,
			   type: 'arrow',
			   from: 1,
			   to: tweet.sub_id_str,
			   arrows: 'from'
		  }); 
		  $('#TwitEdge').html(TwitEdge++)
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
		  $('#TwitEdge').html(TwitEdge++)
		}
		catch(error) {
		  console.log('quoted_status node ');
		  console.error(error);
		}
		//network.stabilize() 
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
				$('#TwitNode').html(TwitNode++)
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
				$('#TwitEdge').html(TwitEdge++)
				} catch(error) {
					console.log('Main tweet ');
					console.error(error);
				}  
		// Hastag part
		if (tweet.streamHashtag.length > 0) {
			//console.log(tweet.streamHashtag);
			
			
				tweet.streamHashtag.forEach((item3, index) => {
					//console.log(item.text);
					//console.log(check(tweet.hashTagVar, 'name', item3.text));
 
					if (!check(tweet.hashTagVar, 'name', item3.text)) {
 	 					 			
					} else {							
						tweet.hashTagVar.forEach((item4, index) => {
							console.log(item4);
							console.log(item3);
							if (item4.name === item3.text) {
								edges.add({
									 id: a++,
									 type: 'arrow',
									 from: tweet.id_str,
									 to: item4.idNode,
									 arrows: 'from'
								});
								$('#TwitEdge').html(TwitEdge++) 
							}
							
						})

  						
					}		 						
				})					
		}
				//network.stabilize() 
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
