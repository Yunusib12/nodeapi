const fs = require('fs');
const util = require('util');
const dbReader = util.promisify(fs.readFile);
const dbEmployee = new Promise((resolve, reject) => resolve(dbReader("./db/employeeDb.json")));
const dbProject = new Promise((resolve, reject) => resolve(dbReader("./db/projectDb.json")));

let emplDetArr = [];
let emplProArr = [];
let employeeId;
let isDetailNeeded = false;

let dbController = {

    getEmployeeData: function (req, res) {

        dbEmployee
            .then((employee) => {

                let listEmployeeArray = JSON.parse(employee);
                employeeId = req.params.id;

                emplDetArr = (employeeId) ? listEmployeeArray.filter((emp) => emp.id == employeeId) : listEmployeeArray
                isDetailNeeded = false;

                (employeeId) ? res.render("employeedetail", { emplDetArr, isDetailNeeded }) : res.send(emplDetArr)
            });
    },
    getEmployeeDetail: function (req, res) {

        Promise.all([dbEmployee, dbProject])
            .then((datas) => {

                let listEmployeeArray = JSON.parse(datas[0]);
                let listProjectArray = JSON.parse(datas[1]);
                let employeeProfile = [];

                //Getting employee details 
                employeeId = req.params.id;

                if (employeeId) {

                    listEmployeeArray.filter((employee) => {

                        if (employee.id == employeeId) {

                            employeeProfile.push({
                                "id": employee.id,
                                "createdAt": employee.createdAt,
                                "name": employee.name,
                                "project": listProjectArray.filter((project) => (project.id == employee.projectId))
                            });
                        }
                    });

                } else {

                    listEmployeeArray.forEach((employee) => {

                        employeeProfile.push({
                            "id": employee.id,
                            "createdAt": employee.createdAt,
                            "name": employee.name,
                            "project": listProjectArray.filter((project) => (project.id == employee.projectId))
                        });
                    });
                }

                res.send(employeeProfile);

            }).catch((err) => console.log(err));
    },
    getProjectDetail: function (req, res) {

        dbProject
            .then((project) => {

                let projectArr = JSON.parse(project);
                let projectId = parseInt(req.params.id);
                let projectDetail;

                (projectId) ? projectDetail = projectArr.filter((datas) => datas.id === projectId) : projectDetail = projectArr;

                res.send(projectDetail);
            });
    }
};

module.exports = dbController