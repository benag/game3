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
    setCanvasHTML:function (canvas){
        canvas.style.position = "absolute";
        canvas.style.left = 500+"px";
        canvas.style.top = 100+"px";
        canvas.width = 500;
        canvas.height = 700;
    },
    resize: function () {
        //this.canvas.width= window.innerWidth;
        //this.canvas.height= window.innerHeight
    },
    setCanvasinHTML: function (canvas) {

    }
};