const fs = require('fs');
const util = require('util');
const path = require('path');
const dbEmployee = util.promisify(fs.readFile);

let dbController = {

    findAllEmployee: function (req, res) {

        Promise.all([dbEmployee("./db/employeeDb.json")])
            .then((datas) => {

                let listEmployeeArray = JSON.parse(datas);
                res.render("main", { listEmployeeArray });
            })
            .catch((err) => console.log(err));

    },
    getEmployeeDetail: function (req, res) {

        Promise.all([dbEmployee("./db/employeeDb.json")])
            .then((datas) => {

                let employeeId = req.params.id;
                let listEmployeeArray = JSON.parse(datas);
                let employeeDetail = listEmployeeArray.filter((employee) => employee.id == employeeId);

                res.render("employeedetail", { employeeDetail });
            })
            .catch((err) => console.log(err));

    }
};

module.exports = dbController