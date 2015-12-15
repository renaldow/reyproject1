/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * MasterActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var MasterConstants = require('../constants/MasterConstants');

var MasterActions = {

  /**
   * @param  {string} text
   */
  getRandomMessageFromBot: function() {
    AppDispatcher.dispatch({
      actionType: MasterConstants.MESSAGE_RANDOM
    })
  },


  sendHumanMessageToBot: function(_text) {
    AppDispatcher.dispatch({
      actionType: MasterConstants.MESSAGE_FROM_HUMAN,
      human_text: _text
    })
  }

};

module.exports = MasterActions;
