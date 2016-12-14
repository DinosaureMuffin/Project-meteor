// Global access
post = new Mongo.Collection( "post" );

if ( Meteor.isServer )
{
    Meteor.startup
    (
        function ()
        {
            // Populate once
            if( ! post.find().count() )
            {
                post.insert( {author : "Priou",author_id : Meteor.userId(), text : "Eric", like : 0, voters : []} );
            }
        }
    );
}

if ( Meteor.isClient )
{
    Template.post.helpers
    ( {
        all_post : function ()
        {
            return post.find();
        }
    } );

    Template.post.helpers
    ({
        isPoster : function ()
        {
            allPost = post.find()
            $.each(allPost, function(value) {
                if (value.author_id == Meteor.userId()) {
                    isPoster = true;
                }
                return isPoster;
            });
        }

    });

    Template.post.events
    ( {
        'click #like' : function( event ) {
            if (Meteor.userId() !== null) {
                var id_post = post.findOne({_id: this._id});
                likes = id_post.like + 1;

                voters = id_post.voters;
                if ($.inArray(Meteor.userId(), voters) === -1) {

                    console.log($.inArray(Meteor.userId(), voters));
                    voters.push(Meteor.userId());
                    console.log(voters);
                    post.update(id_post._id, {
                        $set: {like: likes, voters: voters},
                    });
                } else {
                    alert('TASPASLEDROITDEVOTERESPECEDEPETITPEDESTRE');
                }
            } else {
                alert('nope');
            }
            event.preventDefault();
        }
    } );

    Template.post_insert.events({
        'click #submit_post' : function(event, template)
        {

            console.log(Meteor.users);

            var $author = template.find( "#author" );
            var $text = template.find("#text");

            if( $author.value !== "" && $text.value !== "" ){

                post.insert( { author : $author.value, author_id : Meteor.userId(), text : $text.value, like : 0, voters : [] } );
            }
        }
    })
}
