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



var React = require('react');
var BotAdapter = require('./BotAdapter.react');
var MainSection = require('./MainSection.react');


//-----------------------------------------------------
/**
 * Retrieve the current TODO data from the TodoStore
 */


var Bot_App = React.createClass({

  componentDidMount: function() {

    BotAdapter.getRandomMessageFromBot();

  },

  componentWillUnmount: function() {
    
  },



  /**
   * @return {object}
   */
  render: function() {
    

  	return (

      <MainSection />
      
  	);
  }
  

});


module.exports = Bot_App;
