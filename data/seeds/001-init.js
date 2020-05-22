const bcrypt = require('bcryptjs')
const userPassword = process.env.USER_PASSWORD 
exports.seed = function (knex) {
    // 000-cleanup.js alread cleaned out all tables
  
    const users = [
      {
        username: "sleepy",
        password:  bcrypt.hashSync(userPassword, 14),
      },
      {
        username: "grumpy",
        password:  bcrypt.hashSync(userPassword, 14),
      },
      {
        username: "dopey",
        password:  bcrypt.hashSync(userPassword, 14),
      },
      {
        username: "doc",
        password:  bcrypt.hashSync(userPassword, 14),
      },
      {
        username: "happy",
        password:  bcrypt.hashSync(userPassword, 14),
      },
      {
        username: "basheful",
        password:  bcrypt.hashSync(userPassword, 14),
      },
      {
        username: "sneezy",
        password:  bcrypt.hashSync(userPassword, 14),
      },
    ];
  
    return knex("users").insert(users);
  };