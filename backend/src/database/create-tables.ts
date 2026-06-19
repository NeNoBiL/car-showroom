import {initDatabase, closeDatabase, sequelize} from './database';
import {createLogger} from '../utils/logger';
import '../models/car.model';
import '../models/buyer.model';
import '../models/order.model';
import {setupAssociations} from '../models/associations'

const logger = createLogger('create-tables');

async function createTables(): Promise<void> {
    await initDatabase();
    setupAssociations();
    await sequelize.sync({force: true});
    logger.info('Tables created');
}

(async () => {
    let exitCode = 0;
    try {
        await createTables();
    } catch (createError) {
        logger.error('Table creation failed', createError);
        exitCode = 1;
    } finally {
        try {
            await closeDatabase();
        } catch (closeError) {
            logger.error('Database closing failed', closeError);
        }
    }
    process.exit(exitCode);
})();