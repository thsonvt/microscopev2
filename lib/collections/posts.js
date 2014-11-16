Posts = new Mongo.Collection('posts');

Meteor.methods({
	postInsert: function  (postAttributes) {
		check(Meteor.userId(), String);
		check(postAttributes, {
			title: String,
			url: String
		});

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