
   //var BotMessageStore = require('../stores/BotMessageStore');

   //var foo = $import("../stores/BotMessageStore.js");

   //import "../stores/BotMessageStore.js";



   function DataCommunication(){
  

	var gResourceUrl = "http://162.243.146.199:8080/reybot/webapi/messages";
	var gResourceSendUrl = "http://162.243.146.199:8080/reybot/webapi/messages?";
	var gDataReturned = "";

	this.getBotMessage = function(_updateFunc)
	{

		// _updateFunc("Hey hows it going?");
		// return;

		var messageObj = new MessageObject(false, "");

		this.sendAJAX_GETRequest(messageObj, _updateFunc);

	}

	this.sendBotMessageFromHuman = function(_updateFunc, _humantext, _simulateMessage)
	{

		if(_simulateMessage)
		{
			_updateFunc(_humantext);
			return;
		}
		// _updateFunc("Its nice to see you today.");
		// return;

		var messageObj = new MessageObject(true, _humantext);

		this.sendAJAX_GETRequest(messageObj, _updateFunc);

	}


	this.sendAJAX_GETRequest = function(_messageObj, _updateFunc)
	{
		var xobj = new XMLHttpRequest();
		
		xobj.overrideMimeType("application/json");

		var withM = _messageObj.withMessage();

		if(withM == true)
		{
			var sendUrl = gResourceSendUrl + "messagetobot=" + _messageObj.text()
			xobj.open('GET', sendUrl, true); 
		}
		else
		{
			xobj.open('GET', gResourceUrl, true); 
		}


		xobj.onreadystatechange = function () {
		          
		          if (xobj.readyState == 4 && (xobj.status == "200" || xobj.status == "201")) {
		            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
		            gDataReturned = xobj.responseText;
		           
		           	
		            if(gDataReturned != undefined)
		            {
		                 
		            	_updateFunc(gDataReturned);

		            }
		            else
		            {
		              return null;
		            }

		          }
		    };


			xobj.send(null);  
	}

	
};




    function MessageObject(_sendWithMessage, _messageText)
	{
		 var withMessage = _sendWithMessage;
		 var text = _messageText;

		 this.withMessage = function(){
		 	return withMessage;
		 }

		 this.text = function(){
		 	return text;
		 }
	}


    


module.exports = DataCommunication;