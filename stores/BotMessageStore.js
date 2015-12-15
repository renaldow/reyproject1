'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var MasterConstants = require('../constants/MasterConstants');
var DataCommunication = require('../data/DataCommunication');
var assign = require('object-assign');
var gAppInitialized = false;
var gBotData;
var gLatestBotReply = "<None Bot Reply>";
var gLatestHumanReply = "<No Human Reply>";
var gArrayMessages = [];
var gGooglePlusProfile =  null;
var gGooglePlusProfileAdded = false;
var updateOnceForProfile = false;
var gEmail = "";
var gRealName = "";
var gPreviousBotMessage = "";
var gSimulateProfileQuestionCounter = 0;


var CHANGE_EVENT = 'change';


  function getMessageFromBot() {

    if(!gAppInitialized)
    {
        gBotData = new DataCommunication();

        gBotData.getBotMessage(updateFuncBot);


        gAppInitialized = true;
    }
      
  }

  function sendMessageToBot(_text, _simulateMessage) {

    if(!gAppInitialized)
    {
        gBotData = new DataCommunication();

        gBotData.getBotMessage(updateFuncBot);
        gAppInitialized = true;
    }
    else
    {
        if(_simulateMessage)
        {
          gBotData.sendBotMessageFromHuman(updateFuncBot, _text, true);
        }
        else
        {
          gBotData.sendBotMessageFromHuman(updateFuncBot, _text, false);
        }
    }
      
  }


  function updateFuncBot(_text)
  {
      gLatestBotReply = _text;
      var imageFileName = "Darnell.png"

      if(gPreviousBotMessage == _text)
      {
        _text = "I said..." + _text;
      }

      if(gSimulateProfileQuestionCounter == 2 && gGooglePlusProfileAdded)
      {
        gSimulateProfileQuestionCounter++;

            sendMessageToBot("So, your email is " + gEmail + ". Your lucky I won't spam you.", true);
            
            return;
      }

      if(gGooglePlusProfileAdded)
      {
      gSimulateProfileQuestionCounter++;
      }

       var messageType = new MessageType(_text, imageFileName, imageFileName.replace(/\.[^/.]+$/, ""), true);

       gArrayMessages.push(messageType);


       gPreviousBotMessage = _text;
      BotMessageStore.emitChange();
  }

  function updateFuncHuman(_text)
  {
      gLatestHumanReply = _text;
      var messageType;
      var imageFile;

      if(gGooglePlusProfileAdded)
      {
        if(gGooglePlusProfile.image.url.indexOf("google") > -1)
        {
          imageFile = gGooglePlusProfile.image.url;
        }
        else
        {
            imageFile = "you.png";
        }
        messageType = new MessageType(_text, imageFile, "You", false);
      }
      else
      {
        messageType = new MessageType(_text, "you.png", "You", false);
      }

       gArrayMessages.push(messageType);
       updateAllPicsWithGoogleProfilePic();

      BotMessageStore.emitChange();
  }

  function storeGoogleProfileAndUpdateList(_jsonProfileResponse)
  {
      gGooglePlusProfile = _jsonProfileResponse;

      if(gGooglePlusProfile != null && gGooglePlusProfile.image.url.indexOf("google") > -1)
      {
          gGooglePlusProfileAdded = true;
      }

      updateAllPicsWithGoogleProfilePic();

      updateOnceForProfile = true;

      if(gEmail != "")
      {
          if(gSimulateProfileQuestionCounter == 0)
          {
            //sendMessageToBot(gEmail + " is your email? Your lucky I won't spam you.", true);
            sendMessageToBot("My name is " + gRealName, false);
            gSimulateProfileQuestionCounter++;
          }
          
      }
      else
      {
          BotMessageStore.emitChange();
      }
      

  }

  function updateAllPicsWithGoogleProfilePic()
  {
    for (var index in gArrayMessages) 
      {
          if(!gArrayMessages[index].getIsBot())
          {
              if(gGooglePlusProfile != null && gGooglePlusProfile.image.url.indexOf("google") > -1)
              {
                gArrayMessages[index].setProfilePic(gGooglePlusProfile.image.url);
                gArrayMessages[index].setRealName(gGooglePlusProfile.name.givenName);
                gArrayMessages[index].setEmail(gGooglePlusProfile.emails[0].value);
                gEmail = gGooglePlusProfile.emails[0].value;
                gRealName = gGooglePlusProfile.name.givenName;
              }
          }
      }

      if(gGooglePlusProfile != null && gGooglePlusProfile.emails != undefined && gGooglePlusProfile.displayName != "")
      {
          gEmail = gGooglePlusProfile.emails[0].value;
          gRealName = gGooglePlusProfile.name.givenName;
      }
  }

  function setBotText(_botReply)
  {
      gLatestBotReply = _botReply;
  }


  var BotMessageStore = assign({}, EventEmitter.prototype, {

  getBotText: function ()
  {
      return gLatestBotReply;
  },

  getMessagesList: function ()
  {
      return gArrayMessages;
  },

  storeGooglePlusProfile: function (_jsonProfile)
  {
    gEmail = "";
    gRealName = "";
    gSimulateProfileQuestionCounter = 0;
     storeGoogleProfileAndUpdateList(_jsonProfile);
     
  },

  getGooglePlusProfile: function ()
  {
     return gGooglePlusProfile;
  },

  setUpdateOnceForProfile: function(mode)
  {
      updateOnceForProfile = mode;
  },

  getUpdateOnceForProfile: function()
  {
      return updateOnceForProfile;
  },

  getRealName: function()
  {
      return gRealName;
  },

  

    /**
     * Adds a subscriber to the store to be notified when
     * there are state changes.
     *
     * @param {function} callback
     */
    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    /**
     * Removes the subscriber from the store.
     *
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    /*
     * Emits a change event, notifying all subscribers
     * that the state has changed.
     */
    emitChange: function() {

      //setBotText(_botReply);
      this.emit(CHANGE_EVENT);
    }


  });


  AppDispatcher.register(function(action) {
    var text;

    switch(action.actionType) {
      case MasterConstants.MESSAGE_RANDOM:
        getMessageFromBot();

        break;

      case MasterConstants.MESSAGE_FROM_HUMAN:
        updateFuncHuman(action.human_text);

              sendMessageToBot(action.human_text, false);
        
        break;


      default:
        // no op
    }
  });


function MessageType(_text, _profilePic, _name, _isBot){

    var text = _text;
    var profilePic = _profilePic;
    var name = _name;
    var isBot = _isBot;
    var realName = "";
    var email = ""


    this.getText = function()
    {
      var adjustName = text;

      if(isBot && text.indexOf("Rosie") > -1)
      {
         adjustName = text.replace("Rosie", name);
      }
      else
      {
          adjustName = text;
      }
     
      if(text.indexOf("botmaster") > -1 && text.indexOf("Daniel") > -1)
      {
        adjustName = text.replace("Daniel", "Renaldo");

      }
      return adjustName;
    }

    this.getName = function()
    {
      if(realName != "")
      {
        return realName;
      }
      else
      {
        return name;
      }
      
    }

    this.getProfilePic = function()
    {
      return profilePic;
    }

    this.setProfilePic = function(_pic)
    {
       profilePic = _pic;
    }

    this.getIsBot = function()
    {
      return isBot;
    }

    this.getTime = function()
    {
      return formatAMPM();
    }

    this.setRealName = function(_realName)
    {
        realName = _realName;
    }

    this.getRealName = function()
    {
        return realName;
    }

    this.setEmail = function(_email)
    {
        email = _email;
    }

    this.getEmail = function()
    {
        return email;
    }


 

  }

  function formatAMPM() {

      var date = new Date();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';

      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      
      var strTime = hours + ':' + minutes + ' ' + ampm;
      
      return strTime;
}

module.exports = BotMessageStore;