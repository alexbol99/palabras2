/**
 * Created by alexbol on 1/8/2015.
 */
require.config({
    urlArgs: "bust=" + (new Date()).getTime()
});
require(['models/appstage','models/palabra',
        'views/textbox','views/quiz'],
    function (appStage, Palabra, Textbox, Quiz) {

        Parse.initialize("nNSG5uA8wGI1tWe4kaPqX3pFFplhc0nV5UlyDj8H", "IDxfUbmW9AIn7iej2PAC7FtDAO1KvSdPuqP18iyu");

        // alert ("we are here");
        var quiz = new Quiz();
        quiz.start();

        // var sel = new SelectCategory();

        var a = false;
        var b = false;
        if (a) {

            var PalabraParseObject = Parse.Object.extend("Palabra");
            palabras.forEach(function(p) {
                var palabraObject = new PalabraParseObject();
                palabraObject.set("category", p.get("category"));
                palabraObject.set("spanish", p.get("spanish"));
                palabraObject.set("russian", p.get("russian"));
                palabraObject.save( null, {
                    success: function(object) {
                        console.log('New object created with objectId: ' + object.id);
                    },
                    error: function(object, error) {
                        console.log('Failed to create new object, with error code: ' + error.message);
                    }
                });
            });
        }
        if (b) {
            var PalabraParseObject = Parse.Object.extend("Palabra");
            var PalabrasCollection = Parse.Collection.extend({
                model: PalabraParseObject,
                query: (new Parse.Query(PalabraParseObject)).equalTo("category", "Interrogativos")
            });
            var collection = new PalabrasCollection();
            collection.fetch({
                success: function(collection) {
                    collection.each(function(object) {
                        console.warn(object);
                    });
                },
                error: function(collection, error) {
                    // The collection could not be retrieved.
                    console.warn(error.message);
                }
            });
        }
    });

