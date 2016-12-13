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
                post.insert( {author : "Priou", text : "Eric", like : 45} );
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

    Template.post.events
    ( {
        'click #like' : function( event, template )
        {

            var id_post = post.findOne({_id :this._id});
            likes = id_post.like + 1;

            post.update(id_post._id, {

                $set: { like: likes },

            });
            event.preventDefault();
        }
    } );
}
