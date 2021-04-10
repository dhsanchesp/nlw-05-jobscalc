const Database = require('../db/config')

module.exports = {
    async get() {
        const db = await Database()

        const profileData = await db.get(`SELECT * FROM profile`)

        await db.close()

        const data = {
            name: profileData.name,
            avatar: profileData.avatar,
            "monthly-budget": profileData.monthly_budget,
            "days-per-week": profileData.days_per_week,
            "hours-per-day": profileData.hours_per_day,
            "vacation-per-year": profileData.vacation_per_year,
            "value-hour": profileData.value_hour
        };

        return data;
    },

    async update(newData) {
        const db = await Database()

        db.run(`UPDATE profile SET 
            name = "${newData.name}",
            avatar = "${newData.avatar}",
            monthly_budget =${newData["monthly-budget"]},
            days_per_week = ${newData["days-per-week"]},
            hours_per_day = ${newData["hours-per-day"]},
            vacation_per_year = ${newData["vacation-per-year"]},
            value_hour = ${newData["value-hour"]}`);

        await db.close()
    }
}