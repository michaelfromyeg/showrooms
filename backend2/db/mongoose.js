const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb+srv://dbUser:dbUserPassword@cluster0.ohlko.mongodb.net/dbUser?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    promiseLibrary: global.Promise,
  }
);
