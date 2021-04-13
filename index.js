const Inquirer = require('inquirer');
const fs = require('fs');

const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

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
                    if (answer === '') {
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
                    if (answer === '') {
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
                    if (answer === '') {
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
                    break;
            }
        });
};

let html = '';



function generateHtml() {

    function getCardHtml() {
        let cardHtml = '';

        for (let i = 0; i < team.length; i++) {
            let role = team[i].getRole();
            let thirdItem = ''

            switch (role) {
                case 'Manager':
                    thirdItem = `Office Number: ${team[i].officeNumber}`
                    break;
                case 'Engineer':
                    thirdItem = `GitHub: <a href="https://github.com/${team[i].github}" target="_blank">${team[i].github}</a>`
                    break;
                case 'Intern':
                    thirdItem = `School: ${team[i].school}`
                    break;
            };

            let newCard = `<div class="card" style="width: 18rem;">
           <div class="card-body bg-primary text-white">
               <h5 class="card-title">${team[i].name}</h5>
               <h6 class="card-text">${role}</h6>
           </div>
           <ul class="list-group list-group-flush">
               <li class="list-group-item">ID: ${team[i].id}</li>
               <li class="list-group-item">
                   Email: <a href="mailto:${team[i].email}">${team[i].email}</a> 
                </li>
               <li class="list-group-item">${thirdItem}</li>
           </ul>
       </div>`;
            cardHtml = cardHtml.concat(newCard).concat('\n');
        }
        return cardHtml;
    }
    html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
        <!-- Bootstrap -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
    
        <!-- My CSS -->
        <link rel="stylesheet" href="./style.css">
        <title>Team Profile</title>
    
    </head>
    
    <body>
    
        <header class="text-center bg-danger d-flex justify-content-center align-items-center">My Team</header>
    
        <main>
    
            <div class="d-flex flex-wrap justify-content-center align-items-center">
    
                ${getCardHtml()}
                
            </div>
        </main>
    
        <!-- Boostrap JS -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf"
            crossorigin="anonymous"></script>
    </body>
    
    </html>`


};

function buildTeam() {
    generateHtml();
    fs.writeFileSync('./dist/index.html', html, 'UTF-8')
}

// Function call to initialize the app
getManager();