let products = [
  { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
  { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
  { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
  { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
  { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
];
const express=require('express')

const app=express()
app.set('view engine', 'ejs');
app.use(express.static('public'))
const PORT = 7007 ; 
const bodyParser = require('body-parser')
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    const loggerMiddleware = (req, res, next) => {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
      
      next();
    };

      // Error handling middleware
      app.use((err, req, res, next) => {
      // Default error status code
      const statusCode = err.statusCode || 500;
  
      // Default error message
      const message = err.message || 'Internal Server Error';
  
      // Sending the error response
      res.status(statusCode).json({ error: message });
      
  });
    app.use(loggerMiddleware);

  app.listen(PORT, () => { 
      console.log(`server is running on http://localhost:${PORT}`)
  })

  app.get('/products/', (req, res) => {
      // res.send(
      //     products.map(product =>
      //       ` id : ${product.id} | name : ${product.name} | price : ${product.price} `
      //     )
      //   ) 
      res.render('home' , {products})

    });


    app.get('/products/:id', (req, res,next) => {
      const Id = req.params.id;
      const product = products.filter( (elem) => (elem.id).toString() === Id )
      if(product.length === 0 ) { 
          const error = new Error('User not found');
          error.statusCode = 404;
          next(error);
      }else {   
          res.render('productsDetails' , {product}) 
      }
    });