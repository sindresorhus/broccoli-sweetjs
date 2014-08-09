class Person {
	constructor(name) {
		this.name = name;
	}

	say(msg) {
		console.log(this.name + " says: " + msg);
	}
}

var bob = new Person("Bob");
bob.say("Macros are sweet!");