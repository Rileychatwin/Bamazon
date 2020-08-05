var mysql = require("mysql");
var inquirer = require("inquirer");
var selectID;




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

function customerItem(zeItem) {
    inquirer.prompt([{
        type: 'input',
        name: 'choice',
        message: 'Select the Item ID # you would like to purchase or "Q" to Quit'
    }]).then(function (res) {
        exitPromt(res.choice);
        custPurch = parseInt(res.choice);
       var itemsChecked = checkItem(custPurch, zeItem);
       console.log(itemsChecked);
        







    })
}

function checkItem(selectID, zeItem) {
    for (var i = 0; i < zeItem.length; i++) {
        if (zeItem[i].item_id === selectID) {
            return zeItem[i];
        }
    }
    return null;
};

function exitPromt(sID) {
    if (sID === "q" || sID === "Q") {
        process.exit(0);
    }
};

