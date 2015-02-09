/**
 * Created by alexbol on 1/8/2015.
 */
require.config({
    urlArgs: "bust=" + (new Date()).getTime()
});
require(['models/quiz','models/app','models/palabra','collections/categories',
        'views/textbox','views/quizView','views/selectCategory',
        'views/addItemForm', 'views/editItemForm'],
    function (Quiz /*appStage, Palabra, categories, Textbox, Quiz*/) {
        // $( "#popupPalabras" ).popup( "open" );

        Parse.initialize("nNSG5uA8wGI1tWe4kaPqX3pFFplhc0nV5UlyDj8H", "IDxfUbmW9AIn7iej2PAC7FtDAO1KvSdPuqP18iyu");

        var query = new Parse.Query(Quiz)
            .include("Translation")
            .include("Term");

            /*
            .select("category")
            .limit(1000);
            */

        query.find().then(function(quiz_array) {
            var r = quiz_array;
            quiz_array.forEach( function(quiz) {
                var term = quiz.get("Term");
                var termName = term.get("Name");

                var translation = quiz.get("Translation");
                var translationName = translation.get("Name");

                alert (termName + " - " + translationName);
            });
        });

    });

