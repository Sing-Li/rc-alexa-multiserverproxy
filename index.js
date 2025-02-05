const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');

const server = restify.createServer();

server.use(restify.plugins.bodyParser());

server.listen(config.PORT, () => {
    mongoose.connect(config.MONGODB, {
        useCreateIndex: true,
        useNewUrlParser: true
    });
});

const db = mongoose.connection;

db.on('error', err =>
    console.log(err)
);

db.once('open', () => {
    require('./routes/register')(server);
    require('./routes/data')(server);
    console.log(`Server Started on ${config.PORT}`);
});