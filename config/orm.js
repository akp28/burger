var connection = require("./connection.js");

// ORM
// =============================================================

var tableName = "burgers";

function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
}
  
  // Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
}

var orm = {

  // Here our ORM is creating a simple method for performing a query of the entire table.
  // We make use of the cb to ensure that data is returned only once the query is done.
  selectAll: function(cb) {
    var s = "SELECT * FROM " + tableName + ";";

    connection.query(s, function(err, result) {
      if (err) throw err;
      console.log("all" + JSON.stringify(result));
      cb(result);
    });
  },

  // Here our ORM is creating a simple method for performing a query of a single character in the table.
  // Again, we make use of the cb to grab a specific character from the database.

//   deleteTodo: function(id, cb) {

//     var s = "DELETE FROM " + tableName + " WHERE id=?";

//     connection.query(s, [id], function(err, result) {

//       cb(result);
//     });

//   },

  insertOne: function(addcol, cb) {
    var s = "INSERT INTO " + tableName + " (burger_name) VALUES (??)";
    // addcol.complete = addcol.complete || 0;
    connection.query(s, [addcol], function(err, result) {

      cb(result);

    });
  },

  updateOne: function(updatecol, condition, cb) {
    var queryString = "UPDATE " + tableName;

    queryString += " SET ";
    queryString += updatecol;
    // queryString += objToSql(updatecol);
    queryString += " WHERE ";
    queryString += condition;
    console.log(queryString);
    connection.query(queryString,function(err, result) {
        if (err) throw err;
        cb(result);

    });
  }

};

module.exports = orm;
