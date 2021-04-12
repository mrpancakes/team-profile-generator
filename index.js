const Inquirer = require('inquirer');
const fs = require('fs');

const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const renderPage = require('./dist/html-generator');

let team = [];

function getManager() {
    console.log("Let's build your team!")
    Inquirer
        .prompt([
            {
                type: 'input',
                name: 'managerName',
                message: "What is the team manager's name?",
                validate: answer => {
                    if (answer === ''){
                        console.log('Hmm, enter a valid here.');
                        return false;
                    }
                    return true;
                }
            },
            {
                type: 'input',
                name: 'managerId',
                message: "What is their ID number?"
            },
            {
                type: 'input',
                name: 'managerEmail',
                message: "What is their email address?"
            },
            {
                type: 'input',
                name: 'managerOfficeNumber',
                message: "What is their office number?"
            },
        ])
        .then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            team.push(manager);
            additionalTeamMember();
        }) 
};

function addEngineer() {
    Inquirer
        .prompt([
            {
                type: 'input',
                name: 'engineerName',
                message: "What is the engineer's name?",
                validate: answer => {
                    if (answer === ''){
                        console.log('Hmm, enter a valid here.');
                        return false;
                    }
                    return true;
                }
            },
            {
                type: 'input',
                name: 'engineerId',
                message: "What is their ID number?"
            },
            {
                type: 'input',
                name: 'engineerEmail',
                message: "What is their email address?"
            },
            {
                type: 'input',
                name: 'engineerGithub',
                message: "What is their GitHub username?"
            },
        ])
        .then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            team.push(engineer);
            additionalTeamMember();
        }) 
}

function addIntern() {
    Inquirer
        .prompt([
            {
                type: 'input',
                name: 'internName',
                message: "What is the intern's name?",
                validate: answer => {
                    if (answer === ''){
                        console.log('Hmm, enter a valid here.');
                        return false;
                    }
                    return true;
                }
            },
            {
                type: 'input',
                name: 'internId',
                message: "What is their ID number?"
            },
            {
                type: 'input',
                name: 'internEmail',
                message: "What is their email address?"
            },
            {
                type: 'input',
                name: 'internSchool',
                message: "What school do they attend?"
            },
        ])
        .then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            team.push(intern);
            additionalTeamMember();
        }) 
}

function additionalTeamMember() {
    Inquirer
    .prompt([
        {
            type: 'list',
            name: 'memberTitle',
            message: "Would you like to add another team member?",
            choices: ['Engineer', 'Intern', 'No Thanks, all done!']
        }])
        .then(answer => {
            switch (answer.memberTitle) {
                case "Engineer": 
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                case "No Thanks, all done!":
                    buildTeam();
                    console.log("Your team has been created! Navigate to ./dist/index.html to see the result.")
                    console.log(team);
                    break;
            }
        });
};

function buildTeam() {
    fs.writeFileSync('./dist/index.html', renderPage(team), 'UTF-8')
}


// Function call to initialize the app
getManager();