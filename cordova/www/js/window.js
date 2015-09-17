var MathBalloonWindow = {

    CW: null,
    CH: null,
    canvas: undefined,
    setWindowDimentions: function () {
        this.CW = ndgmr.getScreenWidth();
        this.CH = ndgmr.getScreenHeight();
    },
    setCanvas: function (canvas) {
        canvas.width = this.CW;
        canvas.height = this.CH;
        this.canvas = canvas;
    },
    resize: function () {
        //this.canvas.width= window.innerWidth;
        //this.canvas.height= window.innerHeight
    },
    setCanvasinHTML: function (canvas) {

    }
};