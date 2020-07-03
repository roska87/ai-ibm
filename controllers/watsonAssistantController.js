const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({
  version: process.env.WATSON_ASSISTANT_VERSION,
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_ASSISTANT_APIKEY,
  }),
  url: process.env.WATSON_ASSISTANT_URL,
});

let sendMessage = async (req, res) => {
    try {
        let assistantId = process.env.WATSON_ASSISTANT_ASSISTANT_ID;
        let sessionId = req.body.sessionId ? req.body.sessionId : await createSession(assistantId);
        /* if(req.body.sessionId === undefined || req.body.sessionId === null){ // if(req.body.sessionId)
            sessionId = await createSession(assistantId);
        }
        else{
            sessionId = req.body.sessionId;
        } */
        let text = req.body.text;

        /*
        POST:
        req.body.text
        GET:
        req.params.text (/message/:text)
        or
        req.query.text (/message?text='')
        */

        let response = await assistant.message({ 
            assistantId: assistantId,
            sessionId: sessionId,
            input: {
                'message_type': 'text',
                'text': text
            }
        });
        console.log(JSON.stringify(response.result, null, 2));

        res.status(200).send({
            success: true, 
            sessionId: sessionId,
            intencion: response.result.output.intents[0] || { intent: 'none' },
            result: response.result.output.generic
        });

    } catch (error) {
        console.log(error);
    }
}

let createSession = async (assistantId) => {
    let response = await assistant.createSession({ assistantId: assistantId });
    console.log(`Nueva Session_ID creada: ${response.result.session_id}`);
    return response.result.session_id;
};

module.exports = {
    sendMessage
}