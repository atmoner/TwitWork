const fs = require('fs')
var uniqid = require('uniqid');
var $ = require("jquery")
var vis = require("vis-network")
var Twit = require('twit')
var htmlToImage = require('html-to-image')
const Store = require('electron-store')
const store = new Store()
  
//Lib menu
const mainNetwork = require('./lib/network'); 
const menu = require('./lib/menu'); 
menu.mainMenu(store);

if (store.get('consumer_key')) { 
	var Twitter = new Twit({
    consumer_key: store.get('consumer_key'),
    consumer_secret: store.get('consumer_secret'),
    access_token: store.get('access_token'),
    access_token_secret: store.get('access_token_secret'),
    timeout_ms: 60 * 1000,
    strictSSL: true
	})
}	else {
	$(function() {
		var modal = UIkit.modal("#apiKeyModal");
		modal.show(); 
	});
}
	
$("#stabilize").click(function(e){
	network.stabilize() 
})
$("#options").click(function(e){
	$('#toggle-usage').show()	
})
$("#clear").click(function(e){
	try {
		nodes.getIds().forEach(tweetId => nodes.remove({id: tweetId}));
		$('#retweetStats').html('0')
		$('#tweetStats').html('0')	
		$('#quoteStats').html('0')	
	}
	catch (err) {
		console.error(error);
	}	
})

$("#saveScreen").click(function(e){
	var node = document.getElementById('mynetwork');
	htmlToImage.toJpeg(node, {backgroundColor:'white', quality: 1 })
	  .then(function (dataUrl) {
			var link = document.createElement('a');
			// TODO ajouter un nouveau nom de fichier
			link.download = 'my-image-name.jpeg';
			link.href = dataUrl;
			link.click();
	  }); 
})
// Increment core node/edge
let t = 1;
let a = 1; 
// Increment core node/edge hashtag
let nodeHastag = 2;
// Stats
let tweets = 1;
let retweet = 1;
let quote = 1;
let TwitNode = 1;
let TwitEdge = 1;

$("#startStream").click(function(e){
	// TODO Ajouter un node à chaque mot separés par une virgulle
	result = $('#searchBox').val().split(","); 	 
	if (result.length > 1) {
		result.forEach((item, index) => {
			nodes.add({
				 id: index,
				 label: item
			});
		})
	} else {
			// Genesis! 
		nodes.add({
			   id: 1,
				 label: $('#searchBox').val(),
				 relation: 'tweet',
		     shape: 'circularImage',
			   image: 'Genesis.png',				 
			   size: 35	
				 //fixed:{"x":true,"y":true}, "x":-200, "y":-180
		});
	}

	$("#startStream").hide();
	$("#stopStream").show();
	
	// Hashtag part	
	var hashTag = []
	var hashTagValue = 1
	function check(array, key, value) {
		  return array.some(object => object[key] === value);
	}


	// Parse twitter stream
	var stream = Twitter.stream('statuses/filter', { track: $('#searchBox').val() }) 
	stream.on('tweet', function (tweet) {
 	  //console.log(tweet);
 	  // TODO voir pour switch/case la var tweet
	  if (tweet.retweeted_status) {	  	
 
			if (tweet.retweeted_status.entities.hashtags.length > 0) {
				var	streamHashtag = tweet.retweeted_status.entities.hashtags; // To parse in it function
				tweet.retweeted_status.entities.hashtags.forEach((item, index) => {
					//console.log(item.text);
					//console.log(hashTag.includes(item.text));
					var idNode = uniqid()
					if (!check(hashTag, 'name', item.text)) {
			 			hashTag.push({
			 					name:item.text,
			 					value:hashTagValue,
			 					idNode:idNode
			 			});
			 			// 0/ Ajout des nodes par hashtag =)
						nodes.add({
								 id: idNode,
								 label: '#'+item.text,
								 relation: 'tweet',
								 color:'#FFFF00'
								 //fixed:{"x":true,"y":true}, "x":-200, "y":-150
						});
						$('#retweetStats').html(retweet++) 
						$('#TwitNode').html(TwitNode++)									 					 			
					} else {							
						hashTag.forEach((item2, index) => {
							//console.log(item2);
							if (item2.name === item.text) {
								// TODO add div & append whit increment 
								item2.value = hashTagValue++;
								//console.log('Update hashtag');
							}
							
						})
					}
		 						
				})
				
				//console.log(hashTag);	
				$("#returnHastag").empty();	
				hashTag.forEach((item2, index) => {				
						$("#returnHastag").append(
							'<tr>',
		          '<td><a href="">#'+item2.name+'</a></td>',
		          '<td><b>'+item2.value+'</b></td>',
		      		'</tr>'
						);								
				})				
	  	} else
	  		var	streamHashtag = [];
	  
			var optionRetweeted = {
					id_str: tweet.id_str, 
					screen_name: tweet.user.screen_name, 
					profile_image: tweet.user.profile_image_url_https,
					sub_id_str: tweet.retweeted_status.id_str,
					sub_screen_name: tweet.retweeted_status.user.screen_name,
					sub_profile_image: tweet.retweeted_status.user.profile_image_url_https,
					streamHashtag: streamHashtag,
					hashTagVar: hashTag		 
			};			  
			mainNetwork.add_retweeted(optionRetweeted);
 
	/*} else if (tweet.in_reply_to_status_id) {
 			// TODO Filtrer si le tweet est une reponse, voir la function add_reply dans lib/network.js
		}) */
	  } else if (tweet.quoted_status) {	  
			var optionQuoted = {
					id_str: tweet.id_str, 
					screen_name: tweet.user.screen_name, 
					profile_image: tweet.user.profile_image_url_https,
					sub_id_str: tweet.quoted_status.id_str,
					sub_screen_name: tweet.quoted_status.user.screen_name,
					sub_profile_image: tweet.quoted_status.user.profile_image_url_https				 
			};		
			mainNetwork.add_quoted(optionQuoted);
		 
		  } else {	  	
	  	if (tweet.entities.hashtags.length > 0) {
	  		//console.log(tweet.entities.hashtags);
	  		var	streamHashtag = tweet.entities.hashtags; // To parse in it function
				tweet.entities.hashtags.forEach((item, index) => {
					//console.log(item.text);
					//console.log(hashTag.includes(item.text));
					var idNode = uniqid()
					if (!check(hashTag, 'name', item.text)) {
			 			hashTag.push({
			 					name:item.text,
			 					value:hashTagValue,
			 					idNode:idNode
			 			});
			 			// 0/ Ajout des nodes par hashtag =)
						nodes.add({
								 id: idNode,
								 label: '#'+item.text + 'main',
								 relation: 'tweet',
								 color:'#FFFF00'
								 //fixed:{"x":true,"y":true}, "x":-200, "y":-150
						});
						$('#retweetStats').html(retweet++) 
						$('#TwitNode').html(TwitNode++)									 					 			
					} else {							
						hashTag.forEach((item2, index) => {
							//console.log(item2);
							if (item2.name === item.text) {
								// TODO add div & append whit increment 
								item2.value = hashTagValue++;
								//console.log('Update hashtag');
							}
							
						})
					}		 						
				})
	  	} else
	  		var	streamHashtag = [];
	  		
	  		  
			var optionTwitted = {
					id_str: tweet.id_str, 
					screen_name: tweet.user.screen_name, 
					profile_image: tweet.user.profile_image_url_https,
					streamHashtag: streamHashtag,
					hashTagVar: hashTag			 
			};					
			mainNetwork.add_twitted(optionTwitted);  
	  }
	}) 
	// Stop stream
	$("#stopStream").click(function(e){
		$("#startStream").show();
		$("#stopStream").hide();		
		stream.stop();
	}); 
}); 


 		// Start vis.Network et on filtre par statue du tweet --> retweeted, quoted, tweet 
		const nodeFilterSelector = document.getElementsByName('edgesFilter')
		var nodes = new vis.DataSet([]);
		var edges = new vis.DataSet([]);


    function startNetwork(data) {
      const container = document.getElementById('mynetwork')
      const options = {
					"edges": {
						"smooth": true
					}    
      }
      return new vis.Network(container, data, options)
    }
 
    const nodeFilterValue = {
      retweeted: true,
      quoted: true,
      tweet: true
    }

    const nodesFilter = (edge) => {
      return nodeFilterValue[edge.relation]
    }

    const nodesView = new vis.DataView(nodes, { filter: nodesFilter })
    
    nodeFilterSelector.forEach(filter => filter.addEventListener('change', (e) => {
      const { value, checked } = e.target
      nodeFilterValue[value] = checked
      nodesView.refresh()
    }))
    
		function getExport() {
			var out_data = {
				nodes: nodes.get(),
				edges: edges.get()
			};
			var positions = network.getPositions();
			out_data.nodes.forEach(function(item, index, array) {
				var pos = positions[item.id];
				if (pos !== undefined) {
				  array[index].x = pos.x;
				  array[index].y = pos.y;
				}
			});
			
			$("#Output").click(function(e){
				console.log(out_data);
				const fs = require('fs');
				fs.writeFile("output.json", JSON.stringify(out_data, null, 2) , function(err) {
						if(err) {
								return console.log(err);
						}
						console.log("The file was saved!");
				}); 		
			}) 
			
			// Sauvgarder les data ici =) 
		}
   var network = startNetwork({ nodes: nodesView, edges: edges }) // Gooooo!! 

    //network.setOptions({physics:{stabilization:{fit: false}}});
    //network.stabilize();
    network.on("doubleClick", function (params) {
        params.event = "[original event]";
				Twitter.get('statuses/show', { id: this.getNodeAt(params.pointer.DOM) },  function (err, data, response) { 
					Twitter.get('https://publish.twitter.com/oembed?url=https://twitter.com/'+data.user.screen_name+'/status/'+data.id_str+'?ref_src=twsrc%5Etfw', {}, function (err, data, response) {
						//console.log(data);
						$("#returnUrlHref").html(data.html);
			 
					})
				})  
				// Open modal on double click
				$(function() {
					var modal = UIkit.modal("#detailNode");
					modal.show(); 
				});
	    });
   
   nodes.on('*', function(event, properties, senderId) {
    console.log('Nodes changed');
    setTimeout(getExport,0);
	 });
   edges.on('*', function(event, properties, senderId) {
    console.log('edges changed');
    setTimeout(getExport,0);
   });
		
	 network.on("stabilizationIterationsDone", function () {
		   network.setOptions({
		      physics: {enabled:false}
		   }); 
	 });
