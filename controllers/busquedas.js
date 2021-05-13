//getTodo
const { response } = require('express');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const Usuario = require('../models/usuario');

const getTodo = async (req, res = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i')



    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
    ])
    try {

        res.json({
            ok: true,
            usuarios,
            medicos,
            hospitales
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const getDocumentosColeccion = async (req, res = response) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i')
    let data = [];
    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img')
            break;
        case 'hospitales':

            data = await Hospital.find({ nombre: regex })
                .populate('usuario', 'nombre img')

            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });

            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuario/medicos/hospitales'
            })

    }

    res.json({
        ok: true,
        resultados: data
    })

}
module.exports = {
    getTodo,
    getDocumentosColeccion
}