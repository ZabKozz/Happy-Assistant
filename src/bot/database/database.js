const mongoose = require('mongoose');
const chalk = require('chalk');

module.exports = {
  init: () => {
    mongoose
      .connect(process.env.MONGODB_URL, {
        user: process.env.MONGODB_USER,
        pass: process.env.MONGODB_PASS,
        dbName: process.env.MONGODB_DATABASE,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useFindAndModify: false
      })
      .then(() => {
        // console.log(`[${chalk.green.bold('MongoDB')}]`,chalk.gray(`connected`));
      })
      .catch(err => console.log(err.message));

    mongoose.connection.on('connected', () => {
      console.log(`[${chalk.green.bold('MongoDB')}]`,chalk.gray(`Connected to the database`));
    });

    mongoose.connection.on('error', err => {
      console.log(err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.log(`[${chalk.red.bold('MongoDB')}]`,chalk.gray(`Disconnected from the database`));
    });

    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log(`[${chalk.red.bold('MongoDB')}]`,chalk.gray(`Connection is disconnected due to app termination`));
        process.exit(0);
      });
    });
  }
}