const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminAuthSchema = new Schema ({
    email: {
        type:String,
        required:true
    },

    password: {
        type:String,
        required:true
    },
});

const AdminSchema = mongoose.model('Admin', AdminAuthSchema);

module.exports =AdminSchema;
    