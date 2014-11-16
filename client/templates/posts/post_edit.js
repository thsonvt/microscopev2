Template.postEdit.events({
	'submit form': function  (e) {
		e.preventDefault();

		var currentPostid = this._id;

		var postProperties = {
			url: $(e.target).find('[name=url]').val(), 
			title: $(e.target).find('[name=title]').val()
		}

		Posts.update(currentPostid, {$set: postProperties}, function (error) {
			if (error){
				// display the error to the user
				alert(error.reason);
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