const express = require('express');
const router = express.Router();

const pingController = require('./../controllers/pingController');
const watsonAssistantController = require('./../controllers/watsonAssistantController');

router.get('/hola-mundo', async (req, res) => {
    //console.log(req);
    console.log(req.query);

    //let [usuario, foto] = req.query;

    let usuario = req.query.usuario;
    let foto = req.query.foto;

    res.status(200).send({data: 'hola mundo usuario ' + usuario + ' con ip ' + req.ip + '. Veo que estas buscando la foto: ' + foto});
})

// Rutas Ping
router.get('/ping', pingController.getPing);
router.post('/ping', pingController.postPing);

// Rutas Watson Assistant
router.post('/message', watsonAssistantController.sendMessage);

// Rutas Webhook
router.post('/webhook/assistant', async (req, res) => {
    if(req.body.action === 'hello_world'){
        res.send({ message: 'Hello World' });    
    }else if(req.body.action === 'hoteles_punta' ){    
        res.send({ hoteles: ['Conrad', 'Torreon']});
    }else{
        res.send({ message: 'Hello' });    
    }
});

/*
router.get('usuarios/:id', async (req, res) => {
    console.log(req.params);
})

router
    .route('/usuarios')
    .get(async (req, res) => {

    })
    .post();
*/    

module.exports = router;