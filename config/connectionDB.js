const mongoose = require('mongoose');


const mongoDB = 'mongodb+srv://Shailu:Mangil20@nodedb.ccj5z.mongodb.net/ChatApp?retryWrites=true&w=majority';

mongoose.connect(mongoDB).then( () => {
    console.log('Database conected.');
}).catch(err => console.log(err))