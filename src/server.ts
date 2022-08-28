import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import productRoutes from './handlers/products'
import userRoutes from './handlers/users'
import orderRoutes from './handlers/orders'

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
})

app.listen(port, function () {
    console.log(`starting app on: ${port}`);
})

productRoutes(app);
userRoutes(app);
orderRoutes(app);

export default app;

