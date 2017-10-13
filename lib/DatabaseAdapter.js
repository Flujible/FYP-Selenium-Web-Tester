function DatabaseAdapter(database) {
  this.database = database;

  this.getKey = (guid) => {
    return new Promise(function(resolve, reject) {
      if(guid) {
        database.hgetall(guid, (err, result) => {
          if(err) return reject(err);
          console.log("::::::::::::::::::::::::");
          console.log(JSON.stringify(result));
          console.log("::::::::::::::::::::::::");
          return resolve(JSON.stringify(result));
        });
      } else {
         return reject("No key was provided");
      }
    });
  };

  this.getAllKeys = () => {
    return new Promise(function(resolve, reject) {
      database.keys('*', (err, keys) => {
        if(err) return reject(err);
        return resolve(keys);
      });
    });
  };

  this.set = (guid, data) => {
    return new Promise(function(resolve, reject) {
      if(guid && data) {
        database.hmset(guid, data, (err, res) => {
          if(err) return reject(err);
          return resolve(res);
        });
      }
      return reject ("GUID or data were not provided");
    });
  };

  this.removeKey = (guid) => {
    return new Promise(function(resolve, reject) {
      database.del(guid, (err, res) => {
        if(err) return reject(err);
        return resolve(res);
      });
    });
  };

  this.removeAllKeys = () => {
    return new Promise(function(resolve, reject) {
      database.flushall((err, res) => {
        if(err) return reject(err);
        return resolve(res);
      });
    });
  };
}

module.exports = DatabaseAdapter;
