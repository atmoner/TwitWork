exports.mainMenu = function(store) {
	// TODO Ajouter/sauvgarder un fichier 
	$("#openApi").click(function(e){
		$(function() {
			if (store.get('consumer_key')) { 
					$('#consumer_key').val(store.get('consumer_key'))
					$('#consumer_secret').val(store.get('consumer_secret'))
					$('#access_token').val(store.get('access_token'))
					$('#access_token_secret').val(store.get('access_token_secret'))		
			}
			var modal = UIkit.modal("#apiKeyModal");
			modal.show(); 
		});
	});
	$("#openSettings").click(function(e){
		$(function() {
			var modal = UIkit.modal("#openSettingsModal");
			modal.show(); 
		});
	});	
	$("#githubHelp").click(function(e){
		require("openurl").open('https://github.com/atmoner/TwitWork/issues');		
	});
	$("#twitterAtmon3r").click(function(e){
		require("openurl").open('https://twitter.com/atmon3r');		
	});
	$("#TwitWorkGithub").click(function(e){
		require("openurl").open('https://github.com/atmoner/TwitWork');		
	});

	// Action part
	$("#testapi").click(function(e){
		store.set('consumer_key',$('#consumer_key').val());
		store.set('consumer_secret',$('#consumer_secret').val());
		store.set('access_token',$('#access_token').val());
		store.set('access_token_secret',$('#access_token_secret').val());
	 	location.reload();
	});	
}
