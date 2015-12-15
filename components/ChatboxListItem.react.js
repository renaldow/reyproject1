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


var MasterActions = require('../actions/MasterActions');
var cx = require('classnames');
var MasterConstants = require('../constants/MasterConstants');


//-----------------------------------------------------
/**
 * Retrieve the current TODO data from the TodoStore
 */


var ChatboxListItem = React.createClass({

  propTypes: {
    messageItem: React.PropTypes.object,
    messagesList: React.PropTypes.array,
    index: React.PropTypes.string,
    profilePic: React.PropTypes.string
  },

  componentWillReceiveProps: function(props) {
  this.setState({profilePicName: props.profilePic});
  },

  /**
   * @return {object}
   */
  render: function() {

        var classlist;
        var sent = "Sent " + this.props.messageItem.getTime();
        var background ="";

      

        if(!this.props.messageItem.getIsBot() && this.props.messageItem.getProfilePic().indexOf("google") > -1)
        {
            background = 'url(' + this.props.messageItem.getProfilePic() + ') no-repeat'
        }
        else
        {
            background = 'url(./images/' + this.props.messageItem.getProfilePic() + ') no-repeat';
        }
    
        var profilePicStyle = {
          background: background,
          top: '10px', 
            left: '10px',
            position: 'absolute',   
            width: '80px',  
            height: '80px', 
            backgroundSize: '100%',
            borderRadius: '50%',
            backgroundColor: 'transparent'
        };

        var idForCheckmark= "seen-checkmark-" + this.props.index;
        var idForTypingText = "typing-text-" + this.props.index;
        var idLoaderDots = "loader-dots-" + this.props.index;

        var chatTextId = "chattextbox" + this.props.index;

        var chatLabelId = "chattext-label" + this.props.index;

        var itemCode = (

        <div className='chatbox-listitem'>

              <div className="profile-pic large-background-size" style={profilePicStyle}></div>

              <label className="text-chat-name" id="text-chat-name">{this.props.messageItem.getName()}</label>

              <div className="chat-textbox" ref={chatTextId} id={chatTextId}>

                  <label className="chat-text" id={chatLabelId}>{this.props.messageItem.getText()}</label>

              </div>

              <label className="text-time">{sent}</label>

              <div className="typing-box">
                <div className="seen-checkmark" id={idForCheckmark}></div>
                <label className="typing-text" id={idForTypingText}>Darnell Read</label>

                <div className="loader" id={idLoaderDots}>
                  <span className="loader__dot">.</span>
                  <span className="loader__dot">.</span>
                  <span className="loader__dot">.</span>
                </div>

              </div>
                
          </div>);
 
  	return (

        <div>
          {itemCode}
        </div>
  	);
  }
  
});


module.exports = ChatboxListItem;
