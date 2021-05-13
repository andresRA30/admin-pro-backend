const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },

    img: {
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },


}, { collection: 'hospitales' });

HospitalSchema.method('toJSON', function () {
    //metodo para no regresar valores
    const { __v, ...object } = this.toObject();
    //cambia el nombre del atributo id

    return object;
});
module.exports = model('Hospital', HospitalSchema);