const JSONParser = require('./JSONParser.js')

// Basic JSON Object:
const jsonString1 = '{"name": "Alice", "age": 25}';
console.log(JSONParser.parse(jsonString1)); // Expected: { name: "Alice", age: 25 }

// JSON Array:
const jsonString2 = '["apple", "banana", "cherry"]';
console.log(JSONParser.parse(jsonString2)); // Expected: ["apple", "banana", "cherry"]

// Nested JSON Objects:
const jsonString3 = '{"person": {"name": "Bob", "age": 30}, "city": "London"}';
console.log(JSONParser.parse(jsonString3)); // Expected: { person: { name: "Bob", age: 30 }, city: "London" }

// JSON with Different Data Types:
const jsonString4 = '{"booleanTrue": true, "booleanFalse": false, "nullValue": null, "number": 42}';
console.log(JSONParser.parse(jsonString4)); // Expected: { booleanTrue: true, booleanFalse: false, nullValue: null, number: 42 }

// Empty JSON Object and Array:
const jsonString5 = '{}';
console.log(JSONParser.parse(jsonString5)); // Expected: {}

const jsonString6 = '[]';
console.log(JSONParser.parse(jsonString6)); // Expected: []

// Array of Objects:
const jsonString7 = '[{"name": "Charlie"}, {"name": "Dave"}]';
console.log(JSONParser.parse(jsonString7)); // Expected: [{ name: "Charlie" }, { name: "Dave" }]

// Complex Nested Structure:
const jsonString8 = '{"employees":[{"name":"John", "age":30, "skills":["JavaScript","React"]},{"name":"Jane", "age":25, "skills":["Python","Django"]}]}';
console.log(JSONParser.parse(jsonString8)); // Expected: { employees: [{ name: "John", age: 30, skills: ["JavaScript", "React"] }, { name: "Jane", age: 25, skills: ["Python", "Django"] }] }

// Escaped Characters in Strings:
const jsonString9 = '{"quote": "He said, \\"Hello, world!\\""}';
console.log(JSONParser.parse(jsonString9)); // Expected: { quote: 'He said, "Hello, world!"' }

// Missing Closing Brace:
try {
  const jsonString12 = '{"name": "Eve"';
  console.log(JSONParser.parse(jsonString12)); // Expected: SyntaxError: Unterminated object
} catch (e) {
  console.error(e.message);
}

// Unexpected Token:
try {
  const jsonString13 = '{"name": "Eve", "age": 30, "isStudent": tru}';
  console.log(JSONParser.parse(jsonString13)); // Expected: SyntaxError: Unexpected token: tru
} catch (e) {
  console.error(e.message);
}

// Extra Characters after JSON
try {
  const jsonString15 = '{"name": "Eve"} extra';
  console.log(JSONParser.parse(jsonString15)); // Expected: SyntaxError: Unexpected tokens at end of input
} catch (e) {
  console.error(e.message);
}

// Extra Comma:
try {
  const jsonString14 = '{"name": "Eve", "age": 30,}';
  console.log(JSONParser.parse(jsonString14)); // Expected: SyntaxError: Unexpected token: }
} catch (e) {
  console.error(e.message);
}