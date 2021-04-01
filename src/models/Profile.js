
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
    get() {
        return data;
    },

    update(newData) {
        data = newData;
    }
}