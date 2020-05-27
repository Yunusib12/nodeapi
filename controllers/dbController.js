const fs = require('fs');
const util = require('util');
const path = require('path');
const dbReader = util.promisify(fs.readFile);
const dbEmployee = new Promise((resolve, reject) => resolve(dbReader("./db/employeeDb.json")));
const dbProject = new Promise((resolve, reject) => resolve(dbReader("./db/projectDb.json")));
const dbEmpProj = new Promise((resolve, reject) => resolve(dbReader("./db/employeeProject.json")));

let dbController = {

    findAllEmployee: function (req, res) {

        dbEmployee
            .then((datas) => res.render("main", { listEmployeeArray: JSON.parse(datas) }))
            .catch((err) => console.log(err));

    },
    getEmployeeDetail: function (req, res) {

        let employeeProfile = {
            details: [],
            projects: []
        };

        Promise.all([dbEmployee, dbProject, dbEmpProj])
            .then((datas) => {

                let listEmployeeArray = JSON.parse(datas[0]);
                let listProjectArray = JSON.parse(datas[1]);
                let listEmployeeProject = JSON.parse(datas[2]);

                //Getting employee details 
                let employeeId = req.params.id;
                employeeProfile.details = listEmployeeArray.filter((employee) => employee.id == employeeId);
                let listEmpProj = listEmployeeProject.filter((project) => project.employeeId == employeeId);

                listEmpProj.forEach(id => listProjectArray.forEach((project) => (project.id == id.projectId) && employeeProfile.projects.push(project)));

                console.log(employeeProfile.details, employeeProfile.projects);

                res.render("employeedetail", {
                    emplDetArr: employeeProfile.details,
                    emplProArr: employeeProfile.projects
                });

            }).catch((err) => console.log(err));

        // Promise.all([dbReader("./db/employeeDb.json")])
        //     .then((datas) => {


        //         let listProjectArray = Promise.all([dbReader("./db/projectDb.json")])
        //             .then((projects) => projects)
        //             .catch((err) => console.log(err));

        //         let projectDetail = 
        //         listProjectArray.then((results) => {
        //             console.log(JSON.parse(results));
        //         })

        //         res.render("employeedetail", { employeeDetail });
        //     })
        //     .catch((err) => console.log(err));

    }
};

module.exports = dbController