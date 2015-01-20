/**
 * Created by Owner on 1/20/15.
 */
define(['collections/categories','models/palabra'],
    function (categories, Palabra) {
        var self;
        var AddFormView = Backbone.View.extend({

            el: "form#addItemForm",

            optionTemplate: _.template('<option value="<%= category %>" ><%= text %></option>'),

            events: {
                "submit": "formSubmitted"
            },

            initialize: function () {
                self = this;
                this.category = "";
                $("#add-item-button").on("click", this.openForm);
            },

            openForm: function() {
                // Fill-in select options
                $("form#addItemForm select").empty();
                categories.each( function(category) {
                    $("form#addItemForm select").append(self.optionTemplate( {category: category.get("category"),
                        text: category.get("category")} ));
                });
                $("form#addItemForm select").selectmenu('refresh');
                this.category = $("#select-category-input-field").val();
            },

            resetForm: function() {
                $(self.el)[0].reset();
                $("#select-category-input-field").val(self.category);
                categories.increaseCounter(self.category);
            },

            formSubmitted: function() {
                this.category = $("#select-category-input-field").val();
                var spanish = $("#spanish-input-field").val();
                var russian = $("#russian-input-field").val();
                var hebrew = $("#hebrew-input-field").val();

                var palabra = new Palabra();
                palabra.set("category", this.category);
                palabra.set("spanish", spanish);
                palabra.set("russian", russian);
                palabra.set("hebrew", hebrew);

                palabra.on("added", this.resetForm);

                palabra.addToParse();       // save to cloud and trigger event "added" on success

                return false;
            }
        });

        return new AddFormView();
    });