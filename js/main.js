/**
 * Created by alexbol on 1/8/2015.
 */
require.config({
    urlArgs: "bust=" + (new Date()).getTime()
});
require(['views/loginView','models/quiz',
        'models/app','models/palabra',
        'collections/categories','collections/quizItems',
        'views/textbox','views/quizView','views/selectCategory',
        'views/addItemForm', 'views/editItemForm'],
    function (LoginView, Quiz /*appStage, Palabra, categories, Textbox, Quiz*/) {
        // $( "#popupPalabras" ).popup( "open" );

        Parse.initialize("nNSG5uA8wGI1tWe4kaPqX3pFFplhc0nV5UlyDj8H", "IDxfUbmW9AIn7iej2PAC7FtDAO1KvSdPuqP18iyu");

        window.fbAsyncInit = function() {
            Parse.FacebookUtils.init({
                appId      : '398066583702762',
                status     : true,  // check Facebook Login status
                cookie     : true,  // enable cookies to allow Parse to access the session
                xfbml      : true,  // initialize Facebook social plugins on the page
                version    : 'v2.2' // point to the latest Facebook Graph API version
            });

            // Run code after the Facebook SDK is loaded.
            // FacebookLogIn();
            var loginView = new LoginView();
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

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

                // alert (termName + " - " + translationName);
            });
        });

    });

