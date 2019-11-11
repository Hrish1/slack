"use strict"
let fs = require('fs'),
  appConfig = require("../../config.json"),
  download = require('download'),
  FormData = require('form-data'),
  Await = require("asyncawait/await");

let serializeFile = {
  downloadAttachment(url, filename) {
    let file = Await(download(url).then(function(data){
      fs.writeFileSync(`tmp/assets/${filename}`, data);
      return `tmp/assets/${filename}`;
    }).catch(function(e){
      console.error(e);
    }));
    return file;
  }
}

module.exports = function (botReply) { 
  // botReply.text = "https://www.hdfcbank.com/assets/pdf/Visa-Lounge-List.pdf";
  // botReply.text = "https://c10.avaamo.com//files/122/get?c=05629cb11b6609bbf27812e1f80656c929f865d29cca4b35e0438093d1e16cde";
  let file = fs.createReadStream(serializeFile.downloadAttachment(botReply.text, botReply.asset.name));
  let formData = new FormData();
  formData.append('file', file);
  formData.append('token', appConfig.slack.accessToken);
  formData.append('channels', botReply['channel']);
  formData.append('title', botReply.asset.name);
  return formData;
};
