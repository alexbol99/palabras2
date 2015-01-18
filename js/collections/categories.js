/**
 * Created by Owner on 1/17/15.
 */
define([],
    function () {
        var self;

        //var PalabraParseObject = Parse.Object.extend({
        //    className: "Palabra"
        //});

        var Categories = Backbone.Collection.extend({
            // model: PalabraParseObject,

            initialize: function() {
                Parse.initialize("nNSG5uA8wGI1tWe4kaPqX3pFFplhc0nV5UlyDj8H", "IDxfUbmW9AIn7iej2PAC7FtDAO1KvSdPuqP18iyu");
                self = this;
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
            },

            defineQuery: function() {
                var query = new Parse.Query(PalabraParseObject);
                query.select("category");
                query.limit(1000);
                this.query = query;
            }
        });

        return new Categories();
    });
