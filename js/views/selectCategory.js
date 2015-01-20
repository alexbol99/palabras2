/**
 * Created by Owner on 1/15/15.
 */
define(['collections/categories', 'views/quiz'],
    function (categories, quiz) {
        var self;
        var SelectCategoryView = Backbone.View.extend({

            el: "select#selectCategory",

            template: _.template('<option value="<%= category %>" ><%= text %></option>'),

            events: {
                "change": "categoryChanged"
            },

            initialize: function () {
                self = this;
                this.categories = categories;
                this.categories.on("ready", this.render, this);
            },

            render: function () {
                this.categories.each( function(category) {
                    $(self.el).append(self.template( {category: category.get("category"),
                        text: category.get("category") + ' (' + category.get("count") + ')'} ));
                });
                $(this.el).selectmenu('refresh');
                this.categoryChanged();
            },

            categoryChanged: function() {
                // console.log("category changed to " + $(this.el).val());
                // $( "#popupPalabras" ).popup( "close" );
                quiz.start( $(this.el).val() );
            }

        });

        return new SelectCategoryView();
    });