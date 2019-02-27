'use strict';

module.exports = function(app) {
  if (process.env.AUTOMIGRATE === "TRUE") {
    app.dataSources.mysqlDS.automigrate(null, function(er) {
      if (er) throw er;
      console.log('Loopback tables created in ', app.dataSources.mysqlDS.adapter.name);
        var Tables = ['Usuario', 'Todo'];
        app.dataSources.mysqlDS.automigrate(Tables, function(er) {
        if (er) throw er;
        console.log('Loopback tables [', Tables, '] created in ', app.dataSources.mysqlDS.adapter.name);
      });
    });
  }
};

