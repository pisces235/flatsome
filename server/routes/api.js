const productRouter = require('./products');
//const userRouter = require('./users');
const authRouter = require('./auth');

function route(app) {
  //app.use('/user', userRouter);
  app.use('/product', productRouter);
  app.use('/', authRouter);
}

module.exports = route;
