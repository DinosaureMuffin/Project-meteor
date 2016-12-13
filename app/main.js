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
                post.insert( {name : "Priou", surname : "Eric"} );
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
}
