"use strict"

module.exports = function (botReply) { 
  return {
    channel: botReply['channel'],
    text: botReply['text']
  }
};
