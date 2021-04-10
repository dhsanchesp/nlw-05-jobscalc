const database = require('./config');

const initDB = {
    async init() {

        const db = await database()
        // Criação da modelagem
        const createTbProfile = `CREATE TABLE profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT,
            hours_per_day INT,
            vacation_per_year INT,
            value_hour INT
        )`;
        const createTbJob = `CREATE TABLE job (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )`;

        await db.exec(createTbProfile);
        await db.exec(createTbJob);

        // Inserção dos dados
        const insertProfile = `INSERT INTO profile(
            name, 
            avatar, 
            monthly_budget, 
            days_per_week,
            hours_per_day,
            vacation_per_year,
            value_hour
        ) VALUES(
            "Daniel Sanches",
            "https://github.com/dhsanchesp.png",
            3000,
            5,
            5,
            4,
            75
        )`

        const insertJob01 = `INSERT INTO job(
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "Pizzaria Guloso",
            2,
            1,
            1617514376018
        )`
        const insertJob02 = `INSERT INTO job(
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "OneTwo Project",
            3,
            47,
            1617514376018
        )`

        await db.run(insertProfile);
        await db.run(insertJob01);
        await db.run(insertJob02);

        await db.close()

    }
}

initDB.init();