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
var MasterActions = require('../actions/MasterActions');
var cx = require('classnames');
var MasterConstants = require('../constants/MasterConstants');
var ChatboxListItem = require('./ChatboxListItem.react');
var TimerMixin = require('react-timer-mixin');
var BotMessageStore = require('../stores/BotMessageStore');


//-----------------------------------------------------
/**
 * Retrieve the current TODO data from the TodoStore
 */


var ChatboxList = React.createClass({

mixins: [TimerMixin],

propTypes: {
    messagesList: React.PropTypes.array,
    scrollDownChatFunc: React.PropTypes.func
  },

  shouldComponentUpdate: function(newProps, newState) {
    
     var size = newProps.messagesList.length;

     var previousMessage;
     var readTimer = Math.random() * 2000;
     var tpyingTimer = readTimer + (Math.random() * 3000);
     var sendTimer = tpyingTimer + (Math.random() * 8000);

     if(BotMessageStore.getUpdateOnceForProfile())
     {
        return true;
     }



    
      if(size > 1)
      {
          var currentMessageItem = newProps.messagesList[size - 1];

          if(currentMessageItem.getIsBot())
          {
            var that = this;


            setTimeout(function() {

              var previousIndex = size - 2;
              var isTyping = document.getElementById('typing-text-' + previousIndex);
              var seenCheckmark = document.getElementById('seen-checkmark-' + previousIndex);            
              var dots = document.getElementById('loader-dots-' + previousIndex); 

              if(isTyping == undefined || seenCheckmark == undefined || dots == undefined)
              {
                return true;
              }

            
              isTyping.innerText = "Darnell Read";
              isTyping.style.display = "block";
              seenCheckmark.style.display = "block";
              isTyping.style.left = "23px";
              dots.style.left = "110px";


              //  that.show();
            }, readTimer);

            setTimeout(function() {

              var previousIndex = size - 2;
              var isTyping = document.getElementById('typing-text-' + previousIndex);
              var seenCheckmark = document.getElementById('seen-checkmark-' + previousIndex);            
              var dots = document.getElementById('loader-dots-' + previousIndex);

              if(isTyping == undefined || seenCheckmark == undefined || dots == undefined)
              {
                return true;
              }

              isTyping.innerText = "Darnell Typing";
              isTyping.style.left = "0px";
              isTyping.style.display = "block";
              seenCheckmark.style.display = "none";
              dots.style.display = "block";
              dots.style.left = "86px";

              //  that.show();
            }, tpyingTimer);

            setTimeout(function() {

              var previousIndex = size - 2;
              var isTyping = document.getElementById('typing-text-' + previousIndex);
              var seenCheckmark = document.getElementById('seen-checkmark-' + previousIndex);            
              var dots = document.getElementById('loader-dots-' + previousIndex);

              if(isTyping == undefined || seenCheckmark == undefined || dots == undefined)
              {
                return true;;
              }

              isTyping.style.display = "none";
              seenCheckmark.style.display = "none";
              dots.style.display = "none";

              isTyping.style.left = "23px";
              dots.style.left = "110px";

              that.forceUpdate()

              //  that.show();
            }, sendTimer);


            return false;
           }
          
      }


    return true;
    // set el height and width etc.
  },

  componentDidUpdate: function(prevProps, prevState) {


    this.props.scrollDownChatFunc();

    var size = this.props.messagesList.length - 1;

    if(BotMessageStore.getUpdateOnceForProfile())
     {

        BotMessageStore.setUpdateOnceForProfile(false);
        return;
     }

        if(this.props.messagesList != undefined)
        {

          var chatLabelID = "chattext-label" + size;

         var chattextLabelNode = document.getElementById(chatLabelID);
         var mySplitText = new SplitText(chattextLabelNode, {type: "words, chars"});
         

         if(size == 0)
         {
            TweenMax.to(mySplitText.chars, 0.01, {opacity: 0.01, scale: 0.01});

            setTimeout(function() {
              
              TweenMax.staggerTo(mySplitText.chars, 0.5, {opacity:1, scale:1, ease: Back.easeOut}, 0.02);
              //TweenMax.to(mySplitText.chars, 1, {opacity: 1}, 0.01);

            }, 1000);

         }
         else
         {
            TweenMax.staggerFrom(mySplitText.chars, 0.5, {opacity:0, ease: Back.easeIn}, 0.02, this.allDone);
         }

         
       }

  
    
    // set el height and width etc.
  },


  /**
   * @return {object}
   */
  render: function() {

        var classlist;
        var messagesList_withComponent = [];


        for (var index in this.props.messagesList) 
        { 
            var profilePic = this.props.messagesList[index].getProfilePic();

            messagesList_withComponent.push( 

                    <ChatboxListItem 
                      messageItem={this.props.messagesList[index]}
                      key={index}
                      index={index} 
                      messagesList={this.props.messagesList} /> );
        }

  	return (

            <div className='chatbox-listsection'>

              {messagesList_withComponent}

            </div>
      
  	);
  },

  allDone: function()
  {
    //_mySplitText.revert();
  }
  

});

function setPreviousListSize(_size)
{
    return {

      previousListSize: _size

    };
}


module.exports = ChatboxList;
