const server = require('./server');

export default async function handler(req, res) {
  await server(req, res);
}
