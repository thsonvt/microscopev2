Posts = new Mongo.Collection('posts');

Posts.allow({
	insert: function  (userId, doc) {
		// only allow posting if you are logged in
		return !! userId;
	}
})

// Meteor.startup(function() {
//   Tracker.autorun(function() {
//     console.log('There are ' + Posts.find().count() + ' posts');
//   });
// });