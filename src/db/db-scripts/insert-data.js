module.exports = {
    insertProfile()  {
        return `INSERT INTO profile(
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
    },

    insertJob01() {
        return `INSERT INTO job(
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
    },

    insertJob02() {
        return `INSERT INTO job(
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
    }
}