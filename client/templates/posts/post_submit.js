Template.postSubmit.created = function  () {
    Session.set('postSubmitErrors', {});
}

Template.postSubmit.helpers({
    errorMessage: function  (field) {
        return Session.get('postSubmitErrors')[field];
    },
    errorClass: function(field){
        return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
    }
});

Template.postSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var post = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        };

        var errors = validatePost(post);
        if (errors.title || errors.url)
            return Session.set('postSubmitErrors', errors);

        Meteor.call('postInsert', post, function(error, result) {
            // display the error to the user and abord
            if (error)
                return alert(error.reason);

            // show this result but route anyway
            if (result.postExists)
            // alert('This link has already been posted');
                throwError('This link has already been posted!');

            Router.go('postPage', {_id: result._id});
            // Router.go('postsList');
        });

        Meteor.call('post', post, function(error, id){
            if (error){
                // display the error to the user
                Errors.throw(error.reason);
            }
        });

        // post._id = Posts.insert(post);
        // Router.go('postPage', post);
    }
});
