/* 
Example usage
const myDataStore = new DataStore();

myDataStore.setData('name', 'John');
myDataStore.setData('age', 30);
myDataStore.setData('city', 'New York');

console.log(myDataStore.getData('name')); // Output: John

console.log(myDataStore.getAllKeys()); // Output: ['name', 'age', 'city']

console.log(myDataStore.getAllValues()); // Output: ['John', 30, 'New York']

console.log(myDataStore.getSize()); // Output: 3

myDataStore.removeData('age');

console.log(myDataStore.hasData('age')); // Output: false

myDataStore.clear();

console.log(myDataStore.getSize()); // Output: 0
*/

export default class DataStore {
    
    static #dataMap = new Map();

    // Method to store data in the map
    static setData(key, value) {
        this.#dataMap.set(key, value);
    }

    // Method to retrieve data from the map
    static getData(key) {
        return this.#dataMap.get(key);
    }

    // Method to check if data exists in the map
    static hasData(key) {
        return this.#dataMap.has(key);
    }

    // Method to remove data from the map
    static removeData(key) {
        this.#dataMap.delete(key);
    }

    // Method to get all keys in the map
    static getAllKeys() {
        return Array.from(this.#dataMap.keys());
    }

    // Method to get all values in the map
    static getAllValues() {
        return Array.from(this.#dataMap.values());
    }

    // Method to get the size of the map
    static getSize() {
        return this.#dataMap.size;
    }

    // Method to clear the map
    static clear() {
        this.#dataMap.clear();
    }
}