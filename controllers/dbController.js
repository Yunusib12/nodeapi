const fs = require('fs');
const util = require('util');
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

        let emplDetArr = [];
        let emplProArr = [];

        Promise.all([dbEmployee, dbProject, dbEmpProj])
            .then((datas) => {

                let listEmployeeArray = JSON.parse(datas[0]);
                let listProjectArray = JSON.parse(datas[1]);
                let listEmployeeProject = JSON.parse(datas[2]);

                //Getting employee details 
                let employeeId = req.params.id;
                emplDetArr = listEmployeeArray.filter((employee) => employee.id == employeeId);

                //Getting list of employee Projects
                let listEmpProj = listEmployeeProject.filter((project) => project.employeeId == employeeId);
                listEmpProj.forEach(id => listProjectArray.forEach((project) => (project.id == id.projectId) && emplProArr.push(project)));

                res.render("employeedetail", { emplDetArr, emplProArr });

            }).catch((err) => console.log(err));
    }
};

module.exports = dbController