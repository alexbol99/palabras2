/**
 * Created by alexbol on 1/8/2015.
 */
define([],
    function () {
        var self;
        var AppStage = Backbone.Model.extend({
            defaults: {

            },
            initialize: function () {
                var stage = new createjs.Stage("canvas");
                this.set( "stage", stage);

                createjs.Touch.enable(stage);    // enable touch events
                stage.enableMouseOver(10);       // enabled mouse over / out events
                stage.mouseMoveOutside = true;   // keep tracking the mouse even when it leaves the canvas

                self = this;

                this.resize();                   // resize canvas

                window.addEventListener('orientationchange', function(event) {
                    location.reload();
                    // self.resize();
                }, false);
            },
            resize: function() {
                // Change canvas resolution on changing window size
                var stage = self.get("stage")
                var canvas = stage.canvas;
                var parent = $(canvas).parent();
                canvas.width = parent.width();
                canvas.height = parent.height() - 165;  // minus refresh button height
                stage.update();
            },
            triggerMatch: function() {
                this.trigger("match");
            }
        });
        return new AppStage();
    });