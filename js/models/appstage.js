/**
 * Created by alexbol on 1/8/2015.
 */
define([],
    function () {
        var self;
        var AppStage = Backbone.Model.extend({
            defaults: {

            },
            initialize: function () {
                self = this;

                window.addEventListener('orientationchange', function(event) {
                    location.reload();
                }, false);
            },
            resize: function() {
            },
            triggerMatch: function() {
                this.trigger("match");
            }
        });
        return new AppStage();
    });