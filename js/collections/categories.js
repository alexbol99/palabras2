/**
 * Created by Owner on 1/17/15.
 */
define(['models/app','models/palabra'],
    function (app, palabra) {
        var self;

        var Categories = Backbone.Collection.extend({

            initialize: function() {
                self = this;
                this.sync();
            },

            sync: function() {
                var categories;
                var query = new Parse.Query(palabra);
                query.select("category");
                query.limit(1000);

                query.find().then(function(results) {
                    results.forEach( function(result) {
                        var category = result.get("category");
                        var model = self.findWhere({"category": category});
                        if (model == undefined) {
                            model = self.add({
                                "category" : category,
                                "count" : 0
                            });
                        }
                        model.set("count", model.get("count")+1);
                    });
                    self.trigger("ready");
                });
            }

        });

        return new Categories();
    });