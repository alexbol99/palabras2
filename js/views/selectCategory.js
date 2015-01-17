/**
 * Created by Owner on 1/15/15.
 */
define(['models/appstage'],
    function (appStage) {
        var self;
        return Backbone.View.extend({

            el: "select#selectCategory",

            template: _.template('<option value=<%= value %> ><%= text %></option>'),

            events: {
                "change": "categoryChanged"
            },

            initialize: function () {
                self = this;
                this.categories = [];
                this.retrieveFromParse();
                this.on("ready", this.render, this);
            },

            retrieveFromParse: function() {
                var categories;
                var PalabraParseObject = Parse.Object.extend("Palabra");
                var query = new Parse.Query(PalabraParseObject);
                query.select("category");
                query.limit(1000);
                query.find().then(function(results) {
                    results.forEach( function(result) {
                        // console.log(result.get("category"));
                        self.categories.push(result.get("category"));
                    });
                    self.categories = _.unique(self.categories);
                    self.trigger("ready");
                });
            },

            render: function () {
                this.categories.forEach( function(category) {
                    $(self.el).append(self.template( {value: category, text: category} ))
                });
            },

            categoryChanged: function() {
                console.log("category changed");
            }

        });
    });