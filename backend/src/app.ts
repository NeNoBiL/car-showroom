import express from 'express';
import cors from 'cors';
import carRouter from './routes/car.routes';
import buyerRouter from './routes/buyer.routes';
import orderRouter from './routes/order.routes';
import {createLogger} from './utils/logger';
import {initDatabase, closeDatabase} from "./database/database";
import {setupAssociations} from "./models/associations";


const logger = createLogger('app');
const app = express();
const PORT = 3000

// Middlewares
app.use(express.json());
app.use(cors());

// Establishing connections
setupAssociations();

// Connect routes
app.use('/api/cars', carRouter);
app.use('/api/buyers', buyerRouter);
app.use('/api/orders', orderRouter);

// Graceful shutdown
async function shutdown(): Promise<void> {
    logger.info('Shutting down server');

    try {
        await closeDatabase();
        logger.info('Server stopped');
        process.exit(0);
    } catch (error) {
        logger.error('Error during shutdown', error);
        process.exit(1);
    }
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// App start point
async function appStart(): Promise<void> {
    try {
        await initDatabase();
        app.listen(PORT, () => {
            logger.info(`Server is running on port: ${PORT}`);
        })
    } catch (error) {
        logger.error('Failed to start server', error);
        process.exit(1);
    }
}

appStart();