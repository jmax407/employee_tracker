const inquirer = require('inquirer');
const conn = require('./connection');
const consoleTable = require('console.table');

function startPrompt() {
inquirer.prompt([
        {   type: 'list',
            message: "What would you like to do?",
            name: "start",
            choices: [
                'view all departments',
                'view all roles',
                'view all employees',
                'add a department',
                'add a role',
                'add an employee',
                'update an employee role'
            ]
        }
    ])
    .then(answers => {
      switch(answers.start) {
        case 'view all departments': {
          return viewDepartments();  
        }
        case 'view all roles': {
            return viewAllRoles();
        }
        case 'view all employees': {
            return viewAllEmployees();  
        }
        case 'add a department': {
            return addDepartment(); 
        }
        case 'add a role': {
            return addRole();  
        }
        case 'add an employee': {
            return addEmployee(); 
        }
        case 'update an employee role': {
            return updateRole();   
        }
    }
    }).catch(error => {
        if(error) throw error;
    });

}
    
startPrompt();

function viewDepartments() {
  conn.query(
      `SELECT * FROM departments`, function(err, rows, fields) {
        console.log(`\n`);
        console.table(rows);
      }
  )
  startPrompt();
}

function viewAllRoles() {
    conn.query(
        `SELECT * FROM roles`, function(err, rows, fields) {
            console.log(`\n`);
            console.table(rows);
        }
    )
    startPrompt();
}

function viewAllEmployees() {
    conn.query(
        `SELECT employees.id, employees.first_name, employees.last_name, roles.title, 
        roles.salary, departments.department_name, employees.manager_id
        FROM employees
        JOIN roles 
        ON employees.role_id = roles.id
        JOIN departments 
        ON roles.department_id = departments.id
        `,function(err, rows, fields) {
            console.log(`\n`);
            console.table(rows);
        }
    )
    startPrompt();
}

function addDepartment() {
    inquirer.prompt([
        {   type: 'input',
            message: "Enter name of new Department",
            name: "department"
        }
    ]).then(answers => {
        conn.query(`INSERT INTO departments (department_name) VALUES (?)`, answers.department, function() {
            console.log( `${answers.department} Department has been added to the database`);
        })
        startPrompt();
    });
    
}
// function addRole() {
//     const deparments = conn.query(`SELECT * departments`);
//     const departmentChoices = deparments.map(({id, name}) => ({
//         name: name,
//         value: id
//     }));

//         inquirer.prompt([
//             {   type: 'input',
//                 message: "Enter name of new Role",
//                 name: "title"
//             },
//             {   type: 'input',
//                 message: "What is the starting salary?",
//                 name: "salary"
//             },
//             {   type: 'list',
//                 message: "Choose department to add Role to",
//                 name: "department",
//                 choices: departmentChoices
//             }
//         ])
//         .then(answers => {

//         })
//         .catch(error => {
//             if(error) throw error;
//         });

// }
function addRole() {
    let departmentInfo;
    conn.query('SELECT * FROM departments', function(err, rows, fields) {
        departmentInfo = rows.map(departmentName => departmentName.id + " " + departmentName.department_name)
        inquirer.prompt([
            {   type: 'input',
                message: "Enter name of new Role",
                name: "title"
            },
            {   type: 'input',
                message: "What is the starting salary?",
                name: "salary"
            },
            {   type: 'list',
                message: "Choose department to add Role to",
                name: "department",
                choices: departmentInfo
            }
        ])
        .then(answers => {
            conn.query(`INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`, answers.title, answers.salary, answers.department, function() {
                console.log( `The ${answers.department} Department has been assigned to this role`);
                startPrompt();
            })
            roleshandler(answers.title, answers.salary, answers.department);
            // conn.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${title}',${salary},${department})`, function() {
            //     console.log( `${department} Department has been added to the database`);
            // })
            // conn.query(`INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`)
            // console.log(title, salary, department);
           
        })
    })
      
}
function roleshandler(title, salary, department) {
    let departmentId = department.split(" ", 1);
    conn.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${title}',${salary},${departmentId});`, function() {
        console.log( `${department} Department has been added to the database`);
        startPrompt();
    })
}
function addEmployee() {
    inquirer.prompt([
        {   type: 'input',
            message: "Employee First Name",
            name: "firstName"
        },
        {   type: 'input',
            message: "Employee Last Name",
            name: "lastName"
        },
        {   type: 'list',
            message: "Job title",
            name: "title",
            choices: [
                'Sales Agent',
                'Sales Manager',
                'Engineering Team Director',

            ]
        }
    ])
    startPrompt();
}

function updateRole() {
    `SELECT * FROM employees`
    startPrompt();  
}