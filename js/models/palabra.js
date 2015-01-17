/**
 * Created by alexbol on 1/8/2015.
 */
define([],
    function () {
        return Backbone.Model.extend({
            defaults: {
                id: "",
                leftside: true,
                text: "",
                y: 0
            },
            initialize: function () {

            }
        });
    });
