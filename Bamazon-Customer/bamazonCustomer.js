var mysql = require("mysql");
var inquirer = require("inquirer");



var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,


    user: "root",

    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
    }
    loadProducts();
});

function loadProducts() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;


        console.table(res);

        customerItem(res);
    });
}

function customerItem(zeItem){
    inquirer.prompt([{
        type: 'input',
        name: 'choice',
        message: 'Select the Item ID # you would like to purchase or "Q" to Quit'
    }]).then(function(err, answer){
        if(err) {
        inquirer.prompt([{
            type: 'input',
            name: 'choice',
            message: 'The item does not exist, Select the Item ID # you would like to purchase or "Q" to Quit'
        }])
    }
    })
} 
