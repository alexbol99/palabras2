/**
 * Created by alexbol on 1/8/2015.
 */
define(['models/app', 'collections/quizItems', 'views/textbox'],
    function (app, QuizItems, Textbox) {
        var self;

        var Quiz = Backbone.View.extend({

            el: "div#div-main",

            initialize: function () {
                self = this;
                this.maxNum = (window.orientation == undefined || window.orientation == 0) ? 8 : 4;
                app.on("change:selectedCategory", this.start, this);
                app.on("match", this.match, this);
                app.on("change:mode", this.start, this);
                $("#add-button").hide();
            },

            events: {
                "click #toggle-sound-button" : "toggleSound",
                "click #refresh-button" : "refresh_cb",
                "click #play-button" : "setAppPlay",
                "click #edit-button" : "setAppEdit"
                //"change #language" : "refresh_cb"
            },

            setAppMode: function(event) {
                app.set("mode", $(event.currentTarget).text());
            },

            setAppPlay: function (event) {
                app.set("mode", $(event.currentTarget).text());
                $("#add-button").hide();
                $("#refresh-button").show();
            },

            setAppEdit: function (event) {
                app.set("mode", $(event.currentTarget).text());
                $("#add-button").show();
                $("#refresh-button").hide();
            },

            retrieveFromParse: function(category) {
                this.quizItems = new QuizItems(category);
                this.quizItems.on("sync", function() {
                    self.refresh();
                });
            },

            start: function() {
                this.retrieveFromParse(app.get("selectedCategory"));
            },

            refresh_cb: function() {
                self.refresh();
            },

            match: function() {
                this.curNum--;
                if (this.curNum == 0) {
                    this.refresh();
                }
            },

            refresh: function () {
                this.clearAll();

                if (app.get("mode") == "Play") {
                    this.palabras = this.quizItems.getRandom(this.maxNum);
                }
                else {
                    this.palabras = this.quizItems;
                }

                this.curNum = this.palabras.length;

                var y_position = 0;

                this.palabras.forEach(function(palabra) {
                    if (palabra) {
                        var spanish = new Textbox({
                            model: {
                                palabra: palabra,
                                leftside: true,
                                text: palabra.get("spanish"),
                                y: y_position
                            }
                        });

                        y_position += 50;
                    }
                }, this);

                if (app.get("mode") == "Play") {
                    this.quizItems.shuffle(this.palabras);
                }

                var otherLanguage = "russian";  // $("#language").val();
                var hebrew = otherLanguage == "hebrew" ? true : false

                var y_position = 0;
                this.palabras.forEach(function(palabra) {
                    if (palabra) {
                        var other = new Textbox({
                            model: {
                                palabra: palabra,
                                leftside: false,
                                text: palabra.get(otherLanguage),
                                y: y_position,
                                hebrew: hebrew
                            }
                        });

                        y_position += 50;
                    }
                });
            },

            clearAll: function() {
                $("#palabras-container").empty();
            },

            toggleSound: function(event) {
                var button = event.currentTarget;
                if (app.get("sound")) {
                    $(button).removeClass('ui-icon-audio');
                }
                else {
                    $(button).addClass('ui-icon-audio');
                }
                app.set("sound", !app.get("sound"));
            }

        });

        return new Quiz();
    });

