Template.postEdit.created = function(){
	Session.set('postEditErrors', {});
}

Template.postEdit.helpers({
	errorMessage: function(field){
		return Session.get('postEditErrors')[field];
	},
	errorClass: function(field){
		return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
	}
});

Template.postEdit.events({
	'submit form': function  (e) {
		e.preventDefault();

		var currentPostid = this._id;

		var postProperties = {
			url: $(e.target).find('[name=url]').val(), 
			title: $(e.target).find('[name=title]').val()
		}

		var errors = validatePost(postProperties);
		if (errors.title || errors.url)
			return Session.set('postEditErrors', errors);

		// var postWithSameLink = Posts.findOne({url: postProperties.url});
		// if (postWithSameLink){
			// return {
			// 	postExists: true,
			// 	_id: postWithSameLink._id
			// }
        	// alert('This link has already been posted');
        	// throwError('This link has already been posted!');
        	// Router.go('postPage', {_id: result._id});
            // Router.go('postsList');
		// }

		Posts.update(currentPostid, {$set: postProperties}, function (error) {
			if (error){
				// display the error to the user
				// alert(error.reason);
				throwError(error.reason);
			}else{
				Router.go('postPage', {_id: currentPostid});
			}
		});
	},

	'click .delete': function  (e) {
		e.preventDefault();

		if (confirm("Delete this post?")){
			var currentPostid = this._id;
			Posts.remove(currentPostid);
			Router.go('postsList');
		}
	}
})