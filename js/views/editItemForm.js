/**
 * Created by Owner on 1/20/15.
 */
define(['collections/categories','models/palabra'],
    function (categories, PalabraParseObject) {
        var self;
        var EditFormView = Backbone.View.extend({

            el: "form#editItemForm",

            optionTemplate: _.template('<option value="<%= category %>" ><%= text %></option>'),

            events: {
                "submit": "formSubmitted"
            },

            initialize: function () {
                self = this;
                this.category = "";
                // $("#add-item-button").on("click", this.openForm);
            },

            openForm: function(model) {
                // Fill-in select options
                $("form#editItemForm select").empty();
                categories.each( function(category) {
                    $("form#editItemForm select").append(self.optionTemplate( {category: category.get("category"),
                        text: category.get("category")} ));
                });
                $("form#editItemForm select").selectmenu('refresh');

                var spanish = $("#spanish-edit-input-field").val(model.text);
                /*
                this.category = $("#select-category-edit-input-field").val(model.);
                var russian = $("#russian-edit-input-field").val();
                var hebrew = $("#hebrew-edit-input-field").val();
                */

                this.category = $("#select-category-edit-input-field").val();

                $("#editItemFormPopup").popup("open");
            },

            resetForm: function() {
                $(self.el)[0].reset();
                $("#select-category-edit-input-field").val(self.category);
                // categories.increaseCounter(self.category);   to be done: increase + decrease
            },


            formSubmitted: function() {
                this.category = $("#select-category-edit-input-field").val();
                var spanish = $("#spanish-edit-input-field").val();
                var russian = $("#russian-edit-input-field").val();
                var hebrew = $("#hebrew-edit-input-field").val();

                var palabra = new PalabraParseObject();
                palabra.set("category", this.category);
                palabra.set("spanish", spanish);
                palabra.set("russian", russian);
                palabra.set("hebrew", hebrew);

                palabra.on("added", this.resetForm);

                var queryExist = new Parse.Query(PalabraParseObject)
                    .equalTo("spanish", spanish);
                queryExist.find({
                    success: function(results) {
                        if (results.length == 0) {
                            // palabra.addToParse();       // update in cloud and trigger event "??" on success
                        }
                        else {


                        }
                    },
                    error: function(error) {
                        // There was an error.
                    }
                });

                return false;
            }
        });

        return new EditFormView();
    });