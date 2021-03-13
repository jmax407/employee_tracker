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
    ]).then(answers => {
      console.log(answers);
      switch(answers.start) {
        case 'view all departments': {
          return viewDepartments();  
        }
        case 'view all roles': {
            console.log('I want to' + answers);
        break;    
        }
        case 'view all employees': {
            console.log('I want to' + answers);
        break;    
        }
        case 'add a department': {
            console.log('I want to' + answers);
        break;    
        }
        case 'add a role': {
            console.log('I want to' + answers);
        break;    
        }
        case 'add an employee': {
            console.log('I want to' + answers);
        break;    
        }
        case 'update an employee role': {
            console.log('I want to' + answers);
        break;    
        }
    }
    }).catch(error => {
        if(error) throw error;
    });

}
    
startPrompt();

function viewDepartments() {
  const allDepartments = conn.departments;
  console.long(allDepartments);
}