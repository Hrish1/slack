"use strict"
let serializeCardButtons = require("./serialize_card_buttons");

module.exports = function (botReply) {
  let attachment = botReply.attachment.payload;
  let title, actions;
  switch(attachment.template_type) {
    case 'generic':
      actions = serializeCardButtons(attachment.elements[0].buttons);
      break;
    case 'button':
      actions = serializeCardButtons(attachment.buttons);
      break;
  }
  if(attachment.elements) {
    title = `*${attachment.elements[0].title}*`;
  }
  let attachments = [
    {
      pretext: title,
      text: attachment.text || attachment.elements[0].subtitle,
      color: '#3AA3E3',
      attachment_type: 'default',
      callback_id: botReply.request_message_uuid,
      actions: actions,
    }
  ];
  return {
    channel: botReply['channel'],
    attachments: attachments
  };
};
