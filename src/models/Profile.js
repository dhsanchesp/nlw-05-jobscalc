const Database = require('../db/config')

let data = {
    name: "Daniel Sanches",
    avatar: "https://github.com/dhsanchesp.png",
    "monthly-budget": 5400,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75
};

module.exports = {
    async get() {
        const db = await Database()

        const profileData = await db.get(`SELECT * FROM profile`)

        await db.close()

        data = {
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

    update(newData) {
        data = newData;
    }
}