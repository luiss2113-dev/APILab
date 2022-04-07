
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const router = express.Router();
const { insertarMedicamento, obtenerMedicamentos} = require('./routes/operationsBD');

app.use(cors())
app.use("/", router);

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

//ROUTES
router.get('/medicamentos', (req, res) => {
    obtenerMedicamentos(result => {
        res.json(result)
    });
});

router.post('/save-medicamento', function (req, res, next) {
    let body = {}

    req.on('data', function (data) {
        body = data.toString()
    }).on('end', function () {
        let { nombre, detalle, precio } = JSON.parse(body);
        insertarMedicamento({ nombre, detalle, precio }, result => {
            res.json(result)
        })
    })
}); 

router.use('/', (req, res) => {
    res.json("Bienvenido al API de Inventario para medicamentos")
});

app.listen(3050, () => {
    console.log("Server is running on port 3050")
});