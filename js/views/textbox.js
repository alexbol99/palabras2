/**
 * Created by alexbol on 1/8/2015.
 */
define(['models/appstage'],
    function (appStage) {
        return Backbone.View.extend({

            className: "palabra",

            initialize: function () {
                this.render();

                $(this.el).draggable({ containment: "parent", cursor: "move", revert: true });
                $(this.el).droppable({
                        drop: function( event, ui ) {
                            var other = ui.draggable[0]
                            if (this.id == other.id) {
                                $(this).html(this.innerText + " - " + other.innerText);
                                $(this).fadeOut(1500);
                                $(other).remove();
                                appStage.triggerMatch();
                            }
                        }
                    });
            },

            render: function () {
                $(this.el).html(this.model.get("text"));
                this.el.id = this.model.get("id");    // augment element with id for matching

                $("#palabras-container").append(this.el);

                var left = this.model.get("leftside") ? 0 : $(this.el).parent().width()/2;
                var top = this.model.get("y");

                $(this.el).parent().css({position: 'relative'});
                $(this.el).css({top: top, left: left, position:'absolute'});
            }

        });
    });

