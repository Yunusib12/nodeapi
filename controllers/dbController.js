const fs = require('fs');
const util = require('util');
const dbReader = util.promisify(fs.readFile);
const dbEmployee = new Promise((resolve, reject) => resolve(dbReader("./db/employeeDb.json")));
const dbProject = new Promise((resolve, reject) => resolve(dbReader("./db/projectDb.json")));
const dbEmpProj = new Promise((resolve, reject) => resolve(dbReader("./db/employeeProject.json")));

let emplDetArr = [];
let emplProArr = [];
let employeeId;
let isDetailNeeded = false;

let dbController = {

    findAllEmployee: function (req, res) {

        dbEmployee
            .then((datas) => res.render("main", { listEmployeeArray: JSON.parse(datas) }))
            .catch((err) => console.log(err));
    },
    getEmployeeData: function (req, res) {

        dbEmployee
            .then((employee) => {

                let listEmployeeArray = JSON.parse(employee);
                employeeId = req.params.id;

                emplDetArr = listEmployeeArray.filter((emp) => emp.id == employeeId);
                isDetailNeeded = false;

                res.render("employeedetail", { emplDetArr, isDetailNeeded });
            });
    },
    getEmployeeDetail: function (req, res) {

        Promise.all([dbEmployee, dbProject, dbEmpProj])
            .then((datas) => {

                let listEmployeeArray = JSON.parse(datas[0]);
                let listProjectArray = JSON.parse(datas[1]);
                let listEmployeeProject = JSON.parse(datas[2]);

                //Getting employee details 
                employeeId = req.params.id;
                emplDetArr = listEmployeeArray.filter((employee) => employee.id == employeeId);

                //Getting list of employee Projects
                let listEmpProj = listEmployeeProject.filter((project) => project.employeeId == employeeId);
                listEmpProj.forEach(id => listProjectArray.forEach((project) => (project.id == id.projectId) && emplProArr.push(project)));
                isDetailNeeded = true;

                if (employeeId) {

                    res.render("employeedetail", { emplDetArr, emplProArr, isDetailNeeded });
                } else {

                    //Construct the Employee's Profile
                    let employeeProfile = [];

                    listEmployeeArray.forEach((employee) => {

                        employeeProfile.push({
                            "id": employee.id,
                            "createdAt": employee.createdAt,
                            "name": employee.name,
                            "project": listEmployeeProject.filter((project) => (project.employeeId == employee.id))
                        });


                        // listEmployeeProject.map((employeeProject) => {



                        //     if (employee.id == employeeProject.employeeId) {

                        //         listProjectArray.map((project) => {

                        //             if (employeeProject.projectId == project.id) {
                        //                 console.log(employee, project, employee.id);
                        //             }
                        //         });
                        //     }

                        // });



                    });

                    res.send(employeeProfile);
                }
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