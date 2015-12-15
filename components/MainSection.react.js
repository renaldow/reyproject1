/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */



 'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var BotMessageStore = require('../stores/BotMessageStore');
var MasterActions = require('../actions/MasterActions');
var ChatboxSection = require('./ChatboxSection.react');

var BotAdapter = require('./BotAdapter.react');
var cx = require('classnames');
var MasterConstants = require('../constants/MasterConstants');


//-----------------------------------------------------
/**
 * Retrieve the current TODO data from the TodoStore
 */

function getMessagesList()
{
    return {

      messagesList: BotMessageStore.getMessagesList()

    };
}

var MainSection = React.createClass({

  getInitialState: function() {
    return {messagesList: [],
            doStartUpAnimiation: true}
  },

  componentDidMount: function() {
    if( BotMessageStore.addChangeListener != undefined)
    {
      BotMessageStore.addChangeListener(this._onChange);
    }
  },

  componentWillUnmount: function() {

    if( BotMessageStore.removeChangeListener != undefined)
    {
      BotMessageStore.removeChangeListener(this._onChange);
    }
  },

  componentDidUpdate: function() {

        if(this.state.doStartUpAnimiation)
        {

          var titletextNode = document.getElementById("title-text");
          var chatboxNode = document.getElementById("chatbox-section");
          var messageComposerNose = document.getElementById("message-composer-box"); 

          TweenMax.staggerFrom(".startup-fade", 0.5, {opacity: 0, y:-50, scale:0.9}, 0.2);

          this.setState(this.doStartUpAnimiation());
        }

  },



  /**
   * @return {object}
   */
  render: function() {

        var classlist;
        var chatWithText = "Darnell Chat";
        var loggedIn = "Import my profile \n\n from Google+";

       

          if(BotMessageStore.getRealName() != "")
          {
              chatWithText = "Darnell Chat with " + BotMessageStore.getRealName();
              loggedIn = "Imported \n Successfully"
          }
 
  	return (

            <div className='main-section'>

            <div className="google-logo startup-fade" onClick={auth}>

              <div className="google-g">g</div>

              <div className="google-plus">+</div>

              <div className="google-line"></div>

              <div className="google-import">{loggedIn}</div>

            </div>

            

              <div className="title-text startup-fade" id="title-text">

                <label className="title-label" id="title-label">{chatWithText}</label>
                <label className="subtitle-label"></label>

              </div>

              <ChatboxSection 

                messagesList={this.state.messagesList} />

              <div className="message-composer-box startup-fade" id="message-composer-box">

                  <div className="textarea-box">

                    <textarea type="textarea" placeholder="Write here, press enter to send" ref="writeTextHereTextarea" className="write-text-here-textarea" id="write-text-here-textarea" onKeyDown={this.handleKeyPress}></textarea>

                  </div>

              </div>

            </div>
      
  	);
  },


  handleKeyPress: function(event) {  

    if(event == undefined)
    {
      return;
    }
        if (event.which == 13 || event.keyCode == 13) {

         //var objTextarea = document.getElementById("write-text-here-textarea");
         var text = ReactDOM.findDOMNode(this.refs.writeTextHereTextarea).value;

         ReactDOM.findDOMNode(this.refs.writeTextHereTextarea).value = "";
        
         MasterActions.sendHumanMessageToBot(text);

         event.preventDefault();

        }

     },

     doStartUpAnimiation: function() {
    return {doStartUpAnimiation: false}
    },

  _onChange: function() {
    this.setState(getMessagesList());
  } 

});

 function auth()
  { 
    var config = {
          'client_id': '435481953912-r92g012q6nab2efn43jicr51me87v66k.apps.googleusercontent.com',
          'scope': 'https://www.googleapis.com/auth/userinfo.profile'
        };

        gapi.auth.authorize(config, function() {
          console.log('login complete');
          console.log(gapi.auth.getToken());

           gapi.client.load('plus', 'v1', apiClientLoaded);
        });

  }

  function apiClientLoaded() {
        gapi.client.plus.people.get({userId: 'me'}).execute(handleEmailResponse);
      }

  function handleEmailResponse(_response) {

        BotMessageStore.storeGooglePlusProfile(_response);

       // alert(JSON.stringify(_response));

        
      }



module.exports = MainSection;
