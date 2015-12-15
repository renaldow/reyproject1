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



// 'use strict';
var React = require('react');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var MasterConstants = require('../constants/MasterConstants');
var assign = require('object-assign');
var MasterActions = require('../actions/MasterActions');



var BotAdapter = {

  /**
   * @param  {string} text
   */
  

  getRandomMessageFromBot: function() {
        
          MasterActions.getRandomMessageFromBot();       
      }


};

module.exports = BotAdapter;












