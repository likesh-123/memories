// Opening and closing connections to databases can take a little bit of time,
// especially if your database is on a separate server or service.
// The best practice is to open the connection when your application starts up,
// and to leave it open until your application restarts or shuts down.

// This module only does the work of managing mongoDB connection
const mongoose = require('mongoose')
// const log = require('./logger-config')({ scope: __filename })

const mongoOpts = {
    useNewUrlParser: true
}

let dbUri = process.env.CONNECTION_URL;

// just capture OS level processes
// to monitor and handle safe closing of mongodb connection

const peacefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg)
        callback()
    })
}

mongoose.connect(dbUri, mongoOpts)
    .then(() => {
        console.log('multi-mongo setup done')
    })

const dbServer = process.env.DB_ENV || 'primary'

// connected events
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbUri)
    console.log('Connected to ' + dbServer + ' DB!')
})

mongoose.connection.on('disconnected', function () {
    console.warn('Mongoose connection disconnected -> ' + dbUri)
})

mongoose.connection.on('error', function (err) {
    console.error(err)
})

// when nodemon reboots the app, capture the SIGUSR2 signal
process.once('SIGUSR2', function () {
    peacefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2')
    })
})

// when local app terminates. This will rarely be fired
process.on('SIGINT', function () {
    peacefulShutdown('ST-wallet api termination', function () {
        process.exit(0)
    })
})

// PaaS appln shutdown. same for aws/digitalocean
process.on('SIGTERM', function () {
    peacefulShutdown('DigitalOcean app shutdown', function () {
        process.exit(0)
    })
})

mongoose.set('debug', (process.env.MONGOOSE_DEBUG === 'true'))
