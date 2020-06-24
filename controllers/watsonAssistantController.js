const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({
  version: process.env.WATSON_ASSISTANT_VERSION,
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_ASSISTANT_APIKEY,
  }),
  url: process.env.WATSON_ASSISTANT_URL
});

let sendMessage = async (req, res) => {
    try {
        let assistantId = process.env.WATSON_ASSISTANT_ASSISTANT_ID;
        let sessionId = await createSession(assistantId);
        let text = req.query.text;

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
            result: response.result.output.generic
        });

    } catch (error) {
        console.log(error);
    }
}

let createSession = async (assistantId) => {
    let response = await assistant.createSession({ assistantId: assistantId });
    console.log(JSON.stringify(response.result, null, 2));

    return response.result.session_id;
};

let deleteSession = async (sessionId) => {

}

module.exports = {
    sendMessage
}