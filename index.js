const server = require('./api/server.js');

const PORT = process.env.PORT
if (!module.parent){ 
  server.listen(PORT, () => {
    console.log(`\n=== Server listening on port ${PORT} ===\n`);
  });
}
