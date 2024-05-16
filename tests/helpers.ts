import { ObjectId } from "mongoose";

/**
 * compare all keys and values in fixtureObject are present in the databaseObject
 * @param fixtureObject original fixture
 * @param databaseObject database object
 * @returns true if key present and value strictly equal, false if otherwise
 */
export const compareWithDatabase = (fixtureObject: any, databaseObject: { _id: ObjectId } & any) => {
  for (const key in fixtureObject) {
    const fixtureValue = fixtureObject[key];

    //check exists
    if (databaseObject[key] === undefined) return false;

    const databaseValue = databaseObject[key];

    //check type is the same
    if (typeof fixtureValue != typeof databaseValue) return false;

    //compare values
    if (JSON.stringify(fixtureValue) !== JSON.stringify(databaseValue)) return false;
  }

  return true;
}