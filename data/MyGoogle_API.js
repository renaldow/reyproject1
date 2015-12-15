


   function MyGoogle_API(){
  

	var gAPI_key = "435481953912-r92g012q6nab2efn43jicr51me87v66k.apps.googleusercontent.com";
	var gScope = "https://www.googleapis.com/auth/userinfo.profile";

	this.authenticate = function()
	  { 
	    var config = {
	          'client_id': gAPI_key,
	          'scope': gScope
	        };

	        gapi.auth.authorize(config, function() {
	          console.log('login complete');
	          console.log(gapi.auth.getToken());

	           gapi.client.load('plus', 'v1', this.apiClientLoaded);
	        });

	  }

	  this.apiClientLoaded = function () {
        gapi.client.plus.people.get({userId: 'me'}).execute(this.handleEmailResponse);
      }

      this.handleEmailResponse = function (resp) {
        
        alert(JSON.stringify(resp));
      }

};

   

module.exports = MyGoogle_API;