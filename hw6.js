// Task 1

const translations = {
	en: {
		greet: "Hello",
		intro: "Welcome to our website"
	},
	fr: {
		greet: "Bonjour",
		intro: "Bienvenue sur notre site web"
	}
};

function localize(strings, prop, translations, language) {
	return translations[language][prop]
}

const language = "fr"; // Change to "en" for English
const greeting = "greet";
const introduction = "intro";

const localizedGreeting = localize`${greeting} ${translations} ${language}`;
const localizedIntroduction = localize`${introduction} ${translations} ${language}`;

// console.log(localizedGreeting); // Expected: "Bonjour" (for language "fr")
// console.log(localizedIntroduction); // Expected: "Bienvenue sur notre site web" (for language "fr")

const languageEn = "en"; 
const localizedGreetingEn = localize`${greeting} ${translations} ${languageEn}`;
const localizedIntroductionEn = localize`${introduction} ${translations} ${languageEn}`;

// console.log(localizedGreetingEn)
// console.log(localizedIntroductionEn)

// Task 2

const highlightKeywords = function(template, array) {
  const indicesTemplate = template.match(/\${(\d+)}/g)
  const indices = indicesTemplate.map(item => parseInt(item.match(/\d+/)[0]))
  
  const indexRegex = /\${(\d+)}/g
  let result = ''
  let i = 0
  template.split(' ').forEach(word => {
    if(indexRegex.test(word)) {
      result = result.concat(`<span class='highlight'>${array[indices[i]]}</span> `)
      i += 1
    } else {
      result = result.concat(`${word} `)
    }
  })
  
  return result.trim()
}

const keywords = ["JavaScript", "template", "tagged"];
const template = "Learn \${0} tagged templates to create custom \${1} literals for \${2} manipulation.";
const highlighted = highlightKeywords(template, keywords);
// console.log(highlighted);

// Task 3

function multiline(template) {
	let lines = template[0].split('\n').filter(item => item !== '')
	let result = ''

	for(let i = 1; i <= lines.length; i++) {
		result = result.concat(`${i} ${lines[i - 1]}\n`)
	}
	return result
}

const code = multiline`
function add(a, b) {
  return a + b;
}
`;

// console.log(code);

//Task 4

const debounce = function(func, delay) {
	let timeoutID;

	return function(...args) {
		clearTimeout(timeoutID)
		timeoutID = setTimeout(() => {
			func(...args)
		}, delay)
	}
}

function debouncedSearch(query) {
	// Perform search operation with the query
	console.log("Searching for:", query);
}

const debouncedSearchHandler = debounce(debouncedSearch, 3000);

// const inputElement = document.getElementById("search-input");
// inputElement.addEventListener("input", event => {
// 	debouncedSearchHandler(event.target.value);
// });

// Task 5

const throttle = function(func, interval) {
	let start = 0

	return function(...args) {
		const now = performance.now()
		if(now - start > interval) {
			func(...args)
			start = now
		}
	}
}

function onScroll(event) {
	// Handle scroll event
	console.log("Scroll event:", event);
}

const throttledScrollHandler = throttle(onScroll, 5000);
// window.addEventListener("scroll", throttledScrollHandler);

// Task 6

const curry = function(func, arity, ...args) {
	if(arity === args.length) {
		return func(...args);
	} else {
		return function(next) {
			return curry(func, arity, ...args, next);
		}
	}
}

function multiply(a, b, c) {
	return a * b * c;
}

const curriedMultiply = curry(multiply, 3);

const step1 = curriedMultiply(2); // Returns a curried function
const step2 = step1(3); // Returns a curried function
const result = step2(4); // Returns the final result: 2 * 3 * 4 = 24

// console.log("Result:", result); // Expected: 24