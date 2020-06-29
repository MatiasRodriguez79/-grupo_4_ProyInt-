const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

let usuarioLogueado = ''
function middRecordame (req, res, next){

    if (req.cookies.recordame != undefined && req.session.user == undefined){
            const user = users.find((user) => { 
                return user.id == req.cookies.recordame;
            });     
            usuarioLogueado= user.id
            req.session.user = usuarioLogueado; 
    }
   
    next();
}

module.exports = middRecordame;