// Write your package code here!
Errors = {
	// local (client-only) collection
	collection: new Mongo.Collection(null),

	throw: function  (message) {
		Errors.collection.insert({message: message, seen: false})
	}
};
