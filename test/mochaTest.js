const assert = require('chai').assert;
const db = require('../lib/database.js');
let guid = require("guid");

describe("Database", () => {
  it("should retrieve all keys with an input of '*'", () => {
    let keyArray = db.getKey('*');

    assert.isArray(keyArray, "Is an array");
    assert.isAbove(keyArray.length, 0, "Array is not empty");
    assert(guid.isGuid(keyArray[0]), "Is a valid GUID");
  });

  it("should retrieve a single key with its data with an input of a valid key", () => {
    //Not sure how to test this part of the db
    let key = "";
    let keyInfo = db.getKey(key);

    assert.isObject(keyInfo);
    assert.property(keyInfo, "url");
    assert.property(keyInfo, "status");
    assert.property(keyInfo, "steps");
    assert.property(keyInfo, "result");
    //Test is contains all the expected variables such as status, etc
  });

  it("should delete a key with an input of a valid key");
  it("should update a key with a valid key, a field, and an updated value");
  it("should create a new key with a valid GUID and fields");
})
