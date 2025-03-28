;(function() {
// soup don't need to know there are a point system
var soup = new Soup({
        fontSize: 12,
        fontFamily: "Arial",
        color: "black", // font color
        selectColor: "blue", // line color
        size: 20, // initial grid size
        wordsNum: 30, // initial number of words
        clock: "clock", // where display time? (element id)
        points: "punten", // where display points? (element id)
        layout: "U hebt {points} punten", // how display points?
        startPoint: 1000, // initial points
        every: 20000, // every n miliseconds
        deduct: 10, // deduct n points
        
        /*== Events ==*/
        onHint: function() { this.score.down(100); },
        
        // you get the final score and time in hh:mm:ss format
        onFinish: function(time, score) {
            // do anything
        }
    });
}());
