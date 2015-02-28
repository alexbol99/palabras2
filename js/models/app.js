/**
 * Created by alexbol on 1/8/2015.
 */
define([],
    function () {
        var self;
        var App = Backbone.Model.extend({
            defaults: {
                currentDictionary: ""
            },
            initialize: function () {
                Parse.initialize("nNSG5uA8wGI1tWe4kaPqX3pFFplhc0nV5UlyDj8H", "IDxfUbmW9AIn7iej2PAC7FtDAO1KvSdPuqP18iyu");
                self = this;

                window.addEventListener('orientationchange', function(event) {
                    location.reload();
                }, false);
            },
            start: function() {
                this.set("currentDictionary", "Class_Alberto_Ru");
            },
            resize: function() {
            }
        });
        return new App();
    });