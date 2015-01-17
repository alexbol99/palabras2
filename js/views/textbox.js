/**
 * Created by alexbol on 1/8/2015.
 */
define(['models/appstage'],
    function (appStage) {
        var self;
        var stage;

        return Backbone.View.extend({
            initialize: function () {
                self = this;
                stage = appStage.get("stage");

                var text = this.model.get("text");
                // this.textElement = new createjs.Text(text, "25px Arial", "#ff7700");
                this.textElement = this.createDomElement(text);
                this.textElement.id = this.model.get("id");    // augment element with id for matching
                this.textElement.htmlElement.element = this.textElement;

                this.render();
                this.setHitArea();

                $(this.textElement.htmlElement).draggable();
                $(this.textElement.htmlElement).droppable({
                        drop: function( event, ui ) {
                            alert("dropped")
                            //$( this )
                            //    .addClass( "ui-state-highlight" )
                            //    .find( "p" )
                            //    .html( "Dropped!" );
                        }
                    });

                //$(this.textElement.htmlElement).on("vmousedown", this.dragstart);
                //$(this.textElement.htmlElement).on("vmousemove pressmove", this.dragmove);
                //$(this.textElement.htmlElement).on("vmouseup pressup", this.dragstop);

                //$(document.body).on("mousedown", this.textElement.htmlElement, function (e) {
                //    $dragging = $(e.target);
                //    var position = $dragging.position();
                //    $dragging.start = {
                //        left: position.left - e.pageX,
                //        top: position.top - e.pageY
                //    };
                //});
            },

            render: function () {
                //var x = this.model.get("leftside") ? 0 :
                //    this.model.get("hebrew") ? stage.canvas.width : stage.canvas.width/2;
                var x = this.model.get("leftside") ? 0 : stage.canvas.width/2;
                this.textElement.x = x;
                this.textElement.y = this.model.get("y");   // 0;
                this.textElement.textBaseline = "top";
                this.textElement.textAlign = this.model.get("hebrew") ? "end" : "start";

                stage.addChild(this.textElement);
            },

            events: {
                //"click #unitsLabel": "toggle"
            },

            dragstart: function(event) {
                event.preventDefault();
                var textElement = event.target.element;
                // event.preventSelection
                textElement.offset = {
                    x: textElement.x - event.pageX,
                    y: textElement.y - event.pageY
                };

                // keep original location
                textElement.origX = textElement.x;
                textElement.origY = textElement.y;

                textElement.dragStarted = true;
            },

            dragmove: function(event) {
                event.preventDefault();
                var textElement = event.target.element;
                if (textElement.dragStarted) {
                    textElement.x = event.pageX + textElement.offset.x;
                    textElement.y = event.pageY + textElement.offset.y;
                    stage.update();
                }
            },

            dragstop: function(event) {
                var myTextElement = event.target.element; // this;     // event.currentTarget;
                if (myTextElement.dragStarted) {
                    var center = self.getCenter(myTextElement);
                    var objects = stage.getObjectsUnderPoint(center.x, center.y, 0);

                    var otherTextElement = undefined;
                    objects.forEach(function (object) {
                        if (object != myTextElement) {
                            otherTextElement = object;
                        }
                    });

                    if (otherTextElement) {
                        if (otherTextElement.id == myTextElement.id) {
                            otherTextElement.htmlElement.innerText =
                                myTextElement.htmlElement.innerText + " - " + otherTextElement.htmlElement.innerText;
                            // myTextElement.parent.removeChild(myTextElement);
                            $(myTextElement.htmlElement).remove();

                            createjs.Tween.get(otherTextElement, {loop: false})
                                .to({alpha: 0, y: -100}, 1500, createjs.Ease.getPowInOut(2));
                            /*
                             .to({x: 400}, 1000, createjs.Ease.getPowInOut(4))
                             .to({alpha: 0, y: 75}, 500, createjs.Ease.getPowInOut(2))
                             .to({alpha: 0, y: 125}, 100)
                             .to({alpha: 1, y: 100}, 500, createjs.Ease.getPowInOut(2))
                             .to({x: 100}, 800, createjs.Ease.getPowInOut(2));
                             */
                            createjs.Ticker.setFPS(60);
                            createjs.Ticker.addEventListener("tick", stage);

                            appStage.triggerMatch();
                        }
                        else {
                            myTextElement.x = myTextElement.origX;
                            myTextElement.y = myTextElement.origY;
                            otherTextElement.x = otherTextElement.origX;
                            otherTextElement.y = otherTextElement.origY;
                            stage.update();
                        }
                    }
                }
                myTextElement.dragStarted = false;
            },

            /* Display label as HTML element on canvas */
            createDomElement: function(text) {
                var el = document.createElement('div');
                el.setAttribute('class', 'palabra');
                el.innerHTML = text;
                stage.canvas.parentNode.insertBefore(el, stage.canvas);
                return new createjs.DOMElement(el);
            },

            getCenter: function(text) {
                var textWidth = $(this.textElement.htmlElement).width();   // text.getMeasuredWidth();
                var textHeight = $(this.textElement.htmlElement).height()  // text.getMeasuredHeight();
                return {x: text.x + textWidth / 2, y: text.y + textHeight / 2};
            },


            setHitArea: function () {
                var hitArea = new createjs.Shape();
                // var textWidth = Math.max(this.textElement.getMeasuredWidth(), 0.8*(stage.canvas.width/2)) ;
                var textWidth = Math.max($(this.textElement.htmlElement).width(), 0.8*(stage.canvas.width/2)) ;
                // var textHeight = this.textElement.getMeasuredHeight()+10;
                var textHeight = $(this.textElement.htmlElement).height()+10;
                hitArea.graphics.beginFill("#ff7700").drawRect(0, 0, textWidth, textHeight);
                hitArea.x = (this.textElement.textAlign  == "start" ? 0 : -textWidth);
                hitArea.y = -5;
                this.textElement.hitArea = hitArea;
            }

        });
    });

