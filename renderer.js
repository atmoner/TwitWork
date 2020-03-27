const fs = require('fs')
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

$("#clear").click(function(e){
	try {
		nodes.getIds().forEach(tweetId => nodes.remove({id: tweetId}));
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
// Increment edge
let t = 1;
let a = 1; 

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
				 relation: 'tweet'
		});
	}

	$("#startStream").hide();
	$("#stopStream").show();

	// Parse twitter stream
	var stream = Twitter.stream('statuses/filter', { track: $('#searchBox').val() }) 
	stream.on('tweet', function (tweet) {
 	  //console.log(tweet);
 	  // TODO voir pour switch/case la var tweet
	  if (tweet.retweeted_status) {	  
			var optionRetweeted = {
					id_str: tweet.id_str, 
					screen_name: tweet.user.screen_name, 
					profile_image: tweet.user.profile_image_url_https,
					sub_id_str: tweet.retweeted_status.id_str,
					sub_screen_name: tweet.retweeted_status.user.screen_name,
					sub_profile_image: tweet.retweeted_status.user.profile_image_url_https				 
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
			var optionTwitted = {
					id_str: tweet.id_str, 
					screen_name: tweet.user.screen_name, 
					profile_image: tweet.user.profile_image_url_https 			 
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

    var network = startNetwork({ nodes: nodesView, edges: edges }) // Gooooo!! 

    network.setOptions({physics:{stabilization:{fit: false}}});
    network.stabilize();
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
