const database = require('./config');
const createSchema = require('./db-scripts/create-schema')
const loadData = require('./db-scripts/insert-data')

const initDB = {
    async init() {

        const db = await database()
        // Criação da modelagem
        await db.exec(createSchema.createTableProfile());
        await db.exec(createSchema.createTableJob());

        // Inserção dos dados
        await db.run(loadData.insertProfile());
        await db.run(loadData.insertJob01());
        await db.run(loadData.insertJob02());

        await db.close()

    }
}

initDB.init();