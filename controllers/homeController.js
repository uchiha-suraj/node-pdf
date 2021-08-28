const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');
const options = require('../helpers/options');
const data = require('../helpers/data');


const homeview = (req, res, next) => {
    res.render('home');
}

const generatePdf = async (req, res, next) => {
        const html = fs.readFileSync(path.join(__dirname, '../views/template.html'), 'utf-8');
        const filename = Math.random() + '_doc' + '.pdf';
        let array = [];

        data.forEach(d => {
            const patient = {
                fullName: d.fullName,
                gender: d.gender,
                email: d.email,
                phoneNo: d.phoneNo,
                age: d.age
            }
            array.push(patient);
        });

        const obj = {
            patient: array
        }
        const document = {
            html: html,
            data: {
                patient: obj
            },
            path: './docs/' + filename
        }
        pdf.create(document, options)
            .then(res => {
                console.log(res);
            }).catch(error => {
                console.log(error);
            });
            const filepath = 'http://localhost:3000/docs/' + filename;

            res.render('download', {
                path: filepath
            });
}


module.exports = {
    homeview,
    generatePdf
}