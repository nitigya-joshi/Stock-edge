const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = (uri) => {
    try {
        console.log("working db");
        return mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    catch(err) {
        console.log(err);
    }
};

module.exports = connectDB;