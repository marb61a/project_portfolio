Template.add_post.events({
    'submit add_post_form' : function(event){
        var title = event.target.title.value;
        var body = event.target.body.value;

        // Insert Post
        Posts.insert({
            title: title,
            body: body
        });

        FlashMessages.sendSuccess("Post Added");
        Router.go('/admin/posts');

        // Prevent Submit
        return false;
    }
});