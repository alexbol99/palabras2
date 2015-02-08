/**
 * Created by alexbol on 1/8/2015.
 */
define(['models/app', 'models/palabra', 'views/textbox'],
    function (app, PalabraParseObject, Textbox) {
        var self;

        var Quiz = Backbone.View.extend({

            el: "div#div-main",

            initialize: function () {
                self = this;
                this.maxNum = (window.orientation == undefined || window.orientation == 0) ? 8 : 4;
                app.on("match", this.match, this);
            },

            events: {
                "click #toggle-sound-button" : "toggleSound",
                "click #refresh-button" : "refresh_cb",
                "change #language" : "refresh_cb"
            },

            retrieveFromParse: function(category) {
                // var PalabraParseObject = Parse.Object.extend("Palabra");
                var PalabrasParseCollection = Parse.Collection.extend({
                    model: PalabraParseObject,
                    query: (new Parse.Query(PalabraParseObject)).equalTo("category", category)
                });
                var collection = new PalabrasParseCollection();
                collection.fetch({
                    success: function(collection) {
                        self.palabrasCategory = collection;
                        self.refresh();
                    },
                    error: function(collection, error) {
                        // The collection could not be retrieved.
                        console.warn(error.message);
                    }
                });

                return collection;
            },

            start: function( category ) {
                this.retrieveFromParse(category);
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

                this.palabras = this.getRandom();

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

                this.shuffle(this.palabras);

                var otherLanguage = $("#language").val();
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

            getRandom: function() {
                var palabras = [];
                var inds = [];
                var maxnum = this.maxNum;
                var i;

                if (this.palabrasCategory.length <= maxnum) {
                    this.palabrasCategory.forEach(function(p) {
                        palabras.push(p);
                    });
                    return palabras;
                }

                while (inds.length < maxnum) {
                    i = Math.floor((Math.random() * (this.palabrasCategory.length-1)) + 1);
                    if (inds.indexOf(i) == -1) {
                        inds.push(i);
                    }
                }

                inds.forEach(function(i) {
                    palabras.push(this.palabrasCategory.at(i));
                }, this);
                return palabras;
            },

            // http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
            shuffle: function(array) {
                var counter = array.length, temp, index;

                // While there are elements in the array
                while (counter > 0) {
                    // Pick a random index
                    index = Math.floor(Math.random() * counter);

                    // Decrease counter by 1
                    counter--;

                    // And swap the last element with it
                    temp = array[counter];
                    array[counter] = array[index];
                    array[index] = temp;
                }

                return array;
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

