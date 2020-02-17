exports.mainMenu = function() {
	// TODO Ajouter/sauvgarder un fichier 
	$("#openApi").click(function(e){
		$(function() {
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


}
