/**
 * Created by alexbol on 1/8/2015.
 */
define(['models/app'],
    function (app) {
        return Parse.Object.extend({
            className: "Palabra",

            addToParse: function() {
                var self = this;
                this.validate();
                this.save( null, {
                        success: function (palabra) {
                            alert('New object created with objectId:' + palabra.id);
                            self.trigger("added");
                        },
                        error: function (gameScore, error) {
                            alert('Failed to create new object, with error code: ' + error.message);
                        }
                    }
                );
            },

            validate: function() {

            }
        });
    });
