/**
 * Created by alexbol on 1/8/2015.
 */
define(['models/app'],
    function (app) {
        return Parse.Object.extend({
            className: "Palabra",

            addToParse: function() {
                var self = this;
                this.save( null, {
                        success: function (palabra) {
                            alert('New word added: ' + palabra.get("spanish"));
                            self.trigger("added");
                        },
                        error: function (gameScore, error) {
                            alert('Failed to create new object, with error code: ' + error.message);
                        }
                    }
                );
            }
        });
    });
