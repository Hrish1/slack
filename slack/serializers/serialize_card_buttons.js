"use strict"

module.exports = function (buttons) {
  let actions = [];
  for(let button of buttons) {
    actions.push(
      {
        name: 'pizza_size',
        text: button.title,
        type: 'button',
        value: button.payload
      }
    )
  }
  return actions;
};
