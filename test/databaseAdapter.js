const chai = require('chai');
const assert = chai.assert;
const chaiAsPromised = require("chai-as-promised");
const guid = require("guid");
const DatabaseAdapter = require('../lib/DatabaseAdapter');
const redisClient = require("redis-mock").createClient();
const db = new DatabaseAdapter(redisClient);

/*
  return assert.becomes(promise, "foo", "optional message")
  return assert.doesNotBecome(promise, "foo", "optional message");

  return assert.isRejected(promise, /error message matcher/, "optional message");

  let assertions = [];
  assertions.push(assert.isRejected(something, /message/));
  assertions.push(assert.becomes(something, else));
  expect(promise).to.be.rejected;
  return Promise.all(assertions);
*/

chai.use(chaiAsPromised);

describe("DatabaseAdapter", () => {
  describe(".getKey(guid)", () => {
    it("rejects with no input", () => {
      blankInput = db.getKey();
      return assert.isRejected(blankInput, /No key was provided/);
    });

    it("returns the array of key:value pairs when given a GUID that is present in the db", () => {
      //Create a new ID and data
      let newGuid = guid.create();
      newData = {
        url: "http://www.example.com",
        steps: [{
          id: "id",
          element: "name",
          action: "click",
          value: "",
        }, {
          id: "class",
          element: "email",
          action: "TextEntry",
          value: "Hello",
        }],
        status: "pending"
      };
      //Crate a new DB entry with the above key and data
      db.set(newGuid, newData);

      //Obtain the promise that getKey should provide
      let validEntry = db.getKey(newGuid);

      //Make assertions on the returned promise
      let assertions = [];
      assertions.push(assert.eventually.isObject(validEntry));
      assertions.push(assert.eventually.propertyVal(validEntry, "url", "http://www.example.com"));
      assertions.push(assert.eventually.propertyVal(validEntry, "steps", [{
        id: "id",
        element: "name",
        action: "click",
        value: "",
      }, {
        id: "class",
        element: "email",
        action: "TextEntry",
        value: "Hello",
      }]));
      assertions.push(assert.eventually.propertyVal(validEntry, "status", "pending"));
      return Promise.all(assertions);

    });

    //This should be using the db adapter, not redisClient
    it("rejects if given a GUID that is not in the db", (done) => {
      let newGuid = guid.create();

      redisClient.keys("*", (err, keys) => {
        if(err) console.error(err);
        keys.forEach(key => {
            if(key === newGuid) {
              newGuid = guid.create();
            }
        });
        redisClient.getKey(newGuid, () => {
          return assert.isRejected(promise);
        });
      });
    });
  });

  describe(".getAllKeys()", () => {
    it("returns a list of all keys in the db", () => {
      let trueList = redisClient.keys("*", () => {
        let testList = db.getAllKeys();
        return assert.becomes(testList, trueList);
      });
    });

    it("returns an empty array when the db is empty", () => {
      db.removeAllKeys();
      return assert.eventually.lengthOf(db.getAllKeys(), 0);
    });
  });

  describe(".set(guid, data)", () => {
    it("Updates a key:value pair with when given a key and a value", () => {
      let key = guid.create();
      let data = {"url": "www.example.com",
                   "steps": "[{step 1}, {step 2}]",
                   "status": "pending",
                   "timestamp": "1486564738"};
      let creation = db.set(key, data);
      return assert.isFulfilled(creation);
    });

    it("rejects with no input", () => {
      let reject = db.set();
      return assert.isRejected(reject);
    });

    it("rejects when the data is not valid", () => {
      notValid1 = "Hello!";
      notValid2 = 1234567;
      notValid3 = ["hi", 324];
      notValid4 = {"url": "valid",
                   "steps": "valid",
                   "NotStatus": "Object needs a 'status' parameter to be valid",
                   "timestamp": "valid"};

      reject1 = db.set(notValid1);
      reject2 = db.set(notValid2);
      reject3 = db.set(notValid3);
      reject3 = db.set(notValid4);

      let assertions = [];
      assertions.push(assert.isRejected(reject1));
      assertions.push(assert.isRejected(reject2));
      assertions.push(assert.isRejected(reject3));
      assertions.push(assert.isRejected(reject4));
      return Promise.all(assetions);
    });
  });

  describe(".removeKey(guid)", () => {
    it("removes the specified key from the db", () => {
      let newId = guid.create();
      let data = {
        "url": "www.example.com",
        "steps": "Steps go here",
        "status": "pending",
        "timestamp": "14875647863"
      };
      db.set(newID, data);
      deletion = db.removeKey(newId);
      return assert.isFulfilled(deletion);
    });

    it("rejects with no input", () => {
      let deletion = db.removeKey();
      return assert.isRejected(deletion);
    });

    it("rejects with a GUID that is not in the db", () => {
      let newId = guid.create();
      deletion = db.removeKey(newId);
      return assert.isRejected(deletion);
    });
  });

  describe(".removeAllKeys()", () => {
    it("removes every key/value pair in the database", () => {
      let newId;
      let data = {
        "url": "www.example.com",
        "steps": "Steps go here",
        "status": "pending",
        "timestamp": "14875647863"
      };

      for (let i = 0; i < 10; i++) {
        newId = guid.create();
        db.set(newId, data);
      }

      let purge = db.removeAllKeys();
      let assertions = [];
      assertions.push(assert.eventually.lengthOf(db.getAllKeys(), 0));
      assertions.push(assert.isFulfilled(purge));
      return Promise.all(assertions);
    });
  });
});
