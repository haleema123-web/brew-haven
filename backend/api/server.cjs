const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Validation Middleware
server.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const { title, author, views } = req.body; 

    if (!title || !author) {
      return res.status(400).json({ error: "Bad Request", message: "Missing required fields: 'title' and 'author' are mandatory." });
    }

    if (views !== undefined && typeof views !== 'number') {
      return res.status(400).json({ error: "Bad Request", message: "Invalid data type for field 'views'. Expected a number." });
    }

    const allowedFields = ['title', 'author', 'views'];
    const receivedKeys = Object.keys(req.body);
    const hasExtraFields = receivedKeys.some(key => !allowedFields.includes(key));
    
    if (hasExtraFields) {
      return res.status(400).json({ error: "Bad Request", message: `Extra fields not allowed. Allowed: ${allowedFields.join(', ')}` });
    }
  }
  next();
});

server.use(router);
server.listen(3000, () => {
  console.log('Custom JSON Server running on port 3000');
});