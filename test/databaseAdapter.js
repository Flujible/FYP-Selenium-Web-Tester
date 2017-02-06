const chai = require('chai');
const assert = chai.assert;
const chaiAsPromised = require("chai-as-promised");
const guid = require("guid");
const DatabaseAdapter = require('../lib/DatabaseAdapter');
const redisClient = require("redis-mock").createClient;
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

describe("DatabaseAdapter.js", () => {
  describe(".getKey()", () => {

    it("rejects with no input", () => {
      blankInput = db.getKey();
      return assert.isRejected(blankInput, /No key was provided/);
    });

    it("returns the array of key:value pairs when given a GUID that is present in the db", () => {
      //Create a new ID and data
      newGuid = guid.create();
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
      db.createEntry(newGuid, newData);

      //Obtain the promise that getKey should provide
      let validEntry = db.getKey(newGuid);

      //Make assertions on the returned promise
      let assertions = [];
      assertions.push(assert.isObject(validEntry, /message/));
      assertions.push(assert.propertyVal(validEntry, "url", "http://www.example.com"));
      assertions.push(assert.propertyVal(validEntry, "steps", [{
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
      assertions.push(assert.propertyVal(validEntry, "status", "pending"));
      return Promise.all(assertions);

    });

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
          return expect(promise).to.be.rejected;
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
  });
  describe(".set()", () => {
    it("Updates a key:value pair with when given a key and a value ", () => {
      let key = guid.newGUID();
      let data = {"Key": "Value",
                  "AnotherKey": "AnotherValue!"};
      let creation = db.createEntry(key, data);
      return assert.isFulfilled(creation);
    });
    it("rejects with no input", () => {
      let reject = db.createEntry();
      return assert.isRejected(reject);
    });
    it("rejects when the data is not valid", () => {
      notValid1 = "Hello!";
      notValid2 = 1234567;
      notValid3 = ["hi", 324];
      notValid4 = {"url": "valid",
                   "steps": "valid",
                   "NotStatus": "Object needs a 'status' parameter to be valid"};

      reject1 = db.createEntry(notValid1);
      reject2 = db.createEntry(notValid2);
      reject3 = db.createEntry(notValid3);
      reject3 = db.createEntry(notValid4);

      let assertions = [];
      assertions.push(assert.isRejected(reject1));
      assertions.push(assert.isRejected(reject2));
      assertions.push(assert.isRejected(reject3));
      assertions.push(assert.isRejected(reject4));
      return Promise.all(assetions);
    });
  });
  describe(".removeKey()", () => {
    it("removes the specified key from the db");
    it("rejects with no input");
    it("rejects with a non-valid GUID");
    it("rejects with a GUID that is not in the db");
  });
});
