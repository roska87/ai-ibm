const Cloudant = require('@cloudant/cloudant')

const cloudant = new Cloudant({
    url: process.env.CLOUDANT_URL,
    plugins: {
        iamauth: {
            iamApiKey: process.env.CLOUDANT_APIKEY
        }
    }
});

const insertNlu = async (req, res) => {
    const DB_NLU_DOCUMENTS = cloudant.db.use(process.env.DB_NLU_DOCUMENTS);
    try{
        let response = await DB_NLU_DOCUMENTS.insert(req.body);
        res.send(response);
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    insertNlu
}