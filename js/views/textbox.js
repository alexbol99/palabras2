/**
 * Created by alexbol on 1/8/2015.
 */
define(['models/app', 'views/editItemForm'],
    function (app, editItemForm) {
        return Backbone.View.extend({

            className: "palabra",

            initialize: function () {
                this.render();

                $(this.el).draggable({ containment: "parent", cursor: "move", revert: true });
                $(this.el).droppable({
                        drop: function( event, ui ) {
                            var other = ui.draggable[0];
                            if (this.id == other.id) {
                                $(this).html($(this).text() + " - " + $(other).text());
                                $(this).fadeOut(1500);
                                $(other).remove();
                                app.triggerMatch();
                            }
                        }
                    });
                $(this.el).on( "taphold", function(event) {
                    var position = $(this).position();
                    if ( Math.abs(position.top - this.origTop) <= 10 &&
                        Math.abs(position.left - this.origLeft) <= 10) {
                        // alert("long tap event");
                        editItemForm.openForm(this.model);
                    }
                });

            },

            render: function () {
                $(this.el).html(this.model.text);
                this.el.id = this.model.id;          // augment element with id for matching
                this.el.model = this.model;          // augment with model for edit form initialization

                $(this.el).hide().appendTo("#palabras-container").fadeIn(1500);
                // $("#palabras-container").append(this.el);

                var left = this.model.leftside ? 0 : $(this.el).parent().width()/2;
                var top = this.model.y;

                $(this.el).parent().css({position: 'relative'});
                $(this.el).css({top: top, left: left, position:'absolute'});

                var position = $(this.el).position();
                this.el.origTop = position.top;
                this.el.origLeft = position.left;
            }

        });
    });

