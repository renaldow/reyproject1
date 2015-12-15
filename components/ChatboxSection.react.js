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
var ChatboxList = require('./ChatboxList.react');


//-----------------------------------------------------
/**
 * Retrieve the current TODO data from the TodoStore
 */


var ChatboxSection = React.createClass({

  /**
   * @return {object}
   */
   propTypes: {
    messagesList: React.PropTypes.array
  },

  componentDidUpdate: function() {
    
    this.scrollDownChat();
    

    
    // set el height and width etc.
  },

  render: function() {

        var classlist;


  	return (

            <div className='chatbox-section startup-fade'>

                <div className="chatbox-section-inner" id="chatbox-section-inner">

                <ChatboxList 
                  messagesList={this.props.messagesList}
                  scrollDownChatFunc={this.scrollDownChat} />

                </div>

            </div>
      
  	);
  },

  scrollDownChat: function() {  

    var objDiv = document.getElementById("chatbox-section-inner");
    objDiv.scrollTop = objDiv.scrollHeight;

  }
  

});


module.exports = ChatboxSection;
