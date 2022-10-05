var inquirer = require("inquirer");

const checkTable = require("console.table");
const db = require ('./db/connection');


function Menu () {
    inquirer
    .prompt ({
        
            type:'list',
            name: "choice",
            message:'What would you like to do?',
            choices: [
              "View all departments", 
              "View all roles",
              "View all employees",
              "Add a department",
              "Add a role",
              "Add an employee",
              "Update an employee role",
            ],   
        
    })
    .then (response => {
        switch (response.choice) {
            case "View all departments":
            getDepts ();
            break;
            case "View all roles":
            getRoles ();
            break;
            case "View all employees":
            getEmployee ();
            break;
            case "Add a department":
            addDept ();
            break;
            case "Add a role":
            addRole ();
            break;
            case "Add an employee":
            addEmployee ();
            break;
            case "Update an employee role":
            updateRole ();
            break;
        }
    })
};

const getDepts = () => {
db.promise().query("SELECT * FROM department").then(data => {
    console.table(data[0])
    Menu ();
})
};

const getRoles = () => {
    db.promise().query("SELECT * FROM role").then(data => {
        console.table(data[0])
        Menu ();
    })
    }

const getEmployee = () => {
    var query = `select employee.role_id, employee.first_name, employee.last_name, title, department_name AS department, salary, CONCAT(manager.first_name, ' ' , manager.last_name) AS manager from employee
    LEFT JOIN role ON employee.role_id= role.role_id
    LEFT JOIN department ON department.department_id=role.department_id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.employee_id;
    `
    db.promise().query(query).then(data => {
        console.table(data[0])
        Menu ()
    }) 
}

const updateRole = () => {
    db.promise().query("SELECT * FROM employee").then(allEmployee => {
    
        var employeeArray = allEmployee[0].map(e => {
            
            return {name: `${e.first_name} ${e.last_name}`,
        value:e.employee_id }
        })
        console.log(employeeArray)
        inquirer
        .prompt ([{
            name: "employeeId",
            type: "list",
            message: "Which employee would you like to update?",
            choices: employeeArray
        }]) 
        .then (answer =>{
            db.promise().query("SELECT * FROM role").then(allRoles =>{
                let roleArray = allRoles[0].map(e => {
                    return {name: e.title, value: e.role_id }
                })
                inquirer
                .prompt ([{
                    name: "roleId",
                    type: "list",
                    message: "Which role would you like to assign the employee?",
                    choices: roleArray
                },
                {
                    name: "managerId",
                    type: "list",
                    message: "Who would you want to assign as manager?",
                    choices: employeeArray

                }
            ]) 
                .then (response => {
                    db.promise().query(`UPDATE employee SET role_id = ${response.roleId}, manager_id = ${response.managerId} WHERE employee_id = ${answer.employeeId}`)
                    .then (data => {
                        console.log("Updated Employee")
                        Menu ()
                    })
                })
            })
        })
    })
}
const addDept = () =>{
inquirer
.prompt ([
    {
        name: "deptId",
        type: "input",
        message: "Which department would you like to add?"
    },
])
    .then(function (answer) {
        db.query(
          "INSERT INTO department SET ?",
          {
            department_name: answer.deptId,
          },
          function (err) {
            if (err) throw err;
          }
        );
        Menu();
})
};

const addEmployee = () =>{
    db.promise().query("SELECT * FROM employee").then(employeeData => {
        db.promise().query("SELECT * FROM role").then(roleData => {
            var employeeArray = employeeData[0].map(e => {
        
                return {name: `${e.first_name} ${e.last_name}`,
            value:e.employee_id }
            })
            var roleArray = roleData[0].map(e => {
        
                return {name: e.title,
            value:e.role_id }
            })  

            inquirer
            .prompt ([
                {
                    name: "firstName",
                    type: "input",
                    message: "First Name:"

                },
                {
                    name: "lastName",
                    type: "input",
                    message: "Last Name:"

                },
                {
                    name: "roleId",
                    type: "list",
                    message: "Which role would you like to assign the employee?",
                    choices: roleArray
                },
                {
                    name: "managerId",
                    type: "list",
                    message: "Who would you want to assign as manager?",
                    choices: employeeArray

                },
            ])
            .then(answer => {
                db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                values ('${answer.firstName}', '${answer.lastName}', ${answer.roleId}, ${answer.managerId})`)
                .then (response => {
                    console.log("Added Employee")
                    Menu ()
                })
            })
        })
    })
}




Menu ();