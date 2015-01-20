/**
 * Created by Owner on 1/20/15.
 */
define(['collections/categories','models/palabra'],
    function (categories, Palabra) {
        var self;
        var AddFormView = Backbone.View.extend({

            el: "form#addItemForm",

            events: {
                "submit": "formSubmitted"
            },

            initialize: function () {
                self = this;
            },

            formSubmitted: function() {
                var category = $("#select-category-input-field").val();
                var spanish = $("#spanish-input-field").val();
                var russian = $("#russian-input-field").val();
                var hebrew = $("#hebrew-input-field").val();

                var palabra = new Palabra();
                palabra.set("category", category);
                palabra.set("spanish", spanish);
                palabra.set("russian", russian);
                palabra.set("hebrew", hebrew);

                palabra.save( null, {
                        success: function (palabra) {
                            alert('New object created with objectId:' + palabra.id);
                            $(self.el)[0].reset();
                        },
                        error: function (gameScore, error) {
                            alert('Failed to create new object, with error code: ' + error.message);
                        }
                    }
                );
                return false;
            }
        });

        return new AddFormView();
    });