Posts = new Mongo.Collection('posts');

Posts.allow({
	update: function  (userId, post) {
		return ownsDocument(userId, post);
	},
	remove: function  (userId, post) {
		return ownsDocument(userId, post);
	}
	// update: ownsDocument,
	// remove: ownsDocument
});

Posts.deny({
	update: function  (userId, post, fieldNames) {
		// may only edit the following 2 fields: 
		return (_.without(fieldNames, 'url', 'title').length > 0);
	}
});

Meteor.methods({
	postInsert: function  (postAttributes) {
		check(Meteor.userId(), String);
		check(postAttributes, {
			title: String,
			url: String
		});

		// if (Meteor.isServer){
		// 	postAttributes.title += "(server)";
		// 	// wait for 5 seconds
		// 	Meteor._sleepForMs(5000);
		// }else{
		// 	postAttributes.title += "(client)";
		// }

		var postWithSameLink = Posts.findOne({url: postAttributes.url});

		if (postWithSameLink){
			return {
				postExists: true,
				_id: postWithSameLink._id
			}
		}

		var user = Meteor.user();
		var post = _.extend(postAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});

		var postId = Posts.insert(post);

		return {
			_id: postId			
		};
	}
});

// Posts.allow({
// 	insert: function  (userId, doc) {
// 		// only allow posting if you are logged in
// 		return !! userId;
// 	}
// })

// Meteor.startup(function() {
//   Tracker.autorun(function() {
//     console.log('There are ' + Posts.find().count() + ' posts');
//   });
// });