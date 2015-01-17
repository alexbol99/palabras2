/**
 * Created by alexbol on 1/8/2015.
 */
define(['models/appstage', 'models/palabra', 'views/textbox'],
    function (appStage, Palabra, Textbox) {
        var self;
        var stage;

        return Backbone.View.extend({

            initialize: function () {
                self = this;
                stage = appStage.get("stage");
                this.maxNum = (window.orientation == undefined || window.orientation == 0) ? 8 : 4;
                $("#selectCategory").on("change", this.categoryChanged);
                $("#language").on("change", this.refresh_cb);
                $("#refresh-button").on("click", this.refresh_cb);
                appStage.on("match", this.match, this);
            },

            retrieveFromParse: function(category) {
                var PalabraParseObject = Parse.Object.extend("Palabra");
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

            categoryChanged: function(event) {
                var category = $("#selectCategory").val();
                // self.palabrasCategory = palabrasCollection.where({category : category});
                self.retrieveFromParse(category);
                // self.refresh();
            },

            start: function() {
                var category = $("#selectCategory").val();
                // this.palabrasCategory = palabrasCollection.where({category : category});
                this.retrieveFromParse(category);
                // this.refresh();
            },

            refresh_cb: function() {
                self.refresh();
            },

            refresh: function () {
                this.clearAll();

                this.palabras = this.getRandom();

                this.curNum = this.palabras.length;

                var y_position = 0;

                this.palabras.forEach(function(palabra) {
                    if (palabra) {
                        var model = new Palabra(
                            {
                                id: palabra.cid,
                                leftside: true,
                                text: palabra.get("spanish"),
                                y: y_position
                            });

                        model.on("match", this.match, this);

                        var spanish = new Textbox({ model: model });

                        y_position += 50;
                    }
                }, this);

                this.shuffle(this.palabras);

                var otherLanguage = $("#language").val();
                var hebrew = otherLanguage == "hebrew" ? true : false

                var y_position = 0;
                this.palabras.forEach(function(palabra) {
                    if (palabra) {
                        var model = new Palabra(
                            {
                                id: palabra.cid,
                                leftside: false,
                                text: palabra.get(otherLanguage),   /* get("russian"),*/
                                y: y_position,
                                hebrew: hebrew
                            });

                        model.on("match", this.match, this);

                        var other = new Textbox({ model: model } );

                        y_position += 50;
                    }
                });

                stage.update();
            },

            match: function() {
                this.curNum--;
                if (this.curNum == 0) {
                    this.refresh();
                }
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
                    // palabras.push(this.palabrasCategory[i]);
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
                stage.children.forEach(function(child) {
                    if (child.htmlElement) {
                        $(child.htmlElement).remove();
                    }
                });
                stage.removeAllChildren ();
                stage.clear();
            }
        });
    });

