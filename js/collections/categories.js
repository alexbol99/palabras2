/**
 * Created by Owner on 1/17/15.
 */
define([],
    function () {
        return new Backbone.Collection({
            initialize: function() {
                this.sync();
            },

            sync: function() {
                var categories;
                var PalabraParseObject = Parse.Object.extend("Palabra");
                var query = new Parse.Query(PalabraParseObject);
                query.select("category");
                query.limit(1000);
                query.find().then(function(results) {
                    results.forEach( function(result) {
                        // console.log(result.get("category"));
                        // self.categories.push(result.get("category"));
                        var category = result.get("category");
                        if (categories[category] == undefined) {
                            categories[category].count = 0;
                        }
                        categories[category].count++;
                    });
                    self.categories = _.unique(self.categories);
                    self.trigger("ready");
                });
            }
        });
    });
