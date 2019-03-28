 const { doAction } = require('./actions')

var getResponse = (action, params) => {
      return doAction(action, params)
        .then((result) => {
             if(action == 'docs'){
                return docResponse(result)
             }
            else
            return fulfillmentTextResponse(result) 
        })  
        .catch(function(err) {
            console.log(err)
            return err;
        })
 }
 exports.getResponse = getResponse

 var fulfillmentTextResponse = (message) => {
    return Promise.resolve({ 
        "fulfillmentText": "message",
        "fulfillmentMessages": [{
            "platform": "TELEGRAM",
            "payload": {
                "telegram": {
                    "text": message,
                    "parse_mode": "Markdown"
                }
            }
        }]
    });
}

var docResponse = (imageUri) => {
    return Promise.resolve({
        "fulfillmentText" : "Here's the image",
      "fulfillmentMessages": [{
            "image": {
                "imageUri": imageUri
            }, 
             "platform": "TELEGRAM"
        }]
    });
}

