/**
 * Created by alexbol on 1/8/2015.
 */
define(['models/app'],
    function (app) {
        return Parse.Object.extend({
            className: "Palabra"
        });
    });
