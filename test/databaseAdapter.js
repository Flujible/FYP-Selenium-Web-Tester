const assert = require('chai').assert;
const chaiAsPromised = require("chai-as-promised");
const guid = require("guid");
const DatabaseAdapter = require('../lib/DatabaseAdapter');
const redisClient = require("mock-redis").createClient;
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

describe("database.js", () => {
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
      }
      //Crate a new DB entry with the above key and data
      db.createEntry(newGuid, newData);

      //Obtain the promise that getKey should provide
      let validEntry = db.getKey(newGuid)

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

    it("rejects if given a GUID that is not in the db");
    it("rejects if the first parameter is not a GUID");
  });
  describe(".getAllKeys()", () => {
    it("returns a list of all keys in the db");
  });
  descrie(".createEntry()", () => {
    it("creates a new database entry when given a string, key, and an object, data");
    it("rejects with no input");
    it("rejects when the key is not a valid GUID");
    it("rejects if the GUID is already in use");
    it("rejects when the data is not an object");
    it("rejects when the data does not contain url, steps, and status parameters");
  });
  describe(".updateKey()", () => {
    it("updates the specified key with the specified data");
    it("rejects with no input");
    it("rejects if the key is not a valid GUID");
    it("rejects if the key is not in the db");
    it("rejects if the data is not an object");
  })
  describe(".removeKey()", () => {
    it("removes the specified key from the db");
    it("rejects with no input");
    it("rejects with a non-valid GUID");
    it("rejects with a GUID that is not in the db");
  })
})
