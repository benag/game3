(function (window) {
    function Baloonc(baloonWidth,imgSrc,color,titleText,explosion,x,y,solution,positivescore,scoring,speed,S)  {
        this.initialize(baloonWidth,imgSrc,color,titleText,explosion,x,y,solution,positivescore,scoring,speed,S);
    }
     
    Baloonc.prototype = new createjs.Container();
    Baloonc.prototype.Container_initialize = Baloonc.prototype.initialize;
    Baloonc.prototype.Container_tick = Baloonc.prototype._tick; 
     
    Baloonc.prototype.initialize = function (baloonWidth,imgSrc,color,titleText,explosion,
        x,y,solution,positivescore,scoring,speed,S) {
        this.speed=speed;
        this.snapToPixel = true
        this.Container_initialize();
        this.baloonWidth = baloonWidth;
        this._imgSrc = imgSrc;
        this._color = color;
        this._titleText = titleText;
        this.x=x;
        this.y=y;
        this.velocity = {x:0,y:(-1)*this.speed};
        console.log("Icon initialized : " + this.baloonWidth+" - "+this._imgSrc+" - "+this._color+" - "+this._titleText);
        this.bitmap = new createjs.Bitmap(this._imgSrc);
        this.bitmap.x =  this.baloonWidth*0.5;
        this.bitmap.y =  this.baloonWidth*0.5;
        //this.bitmap.addEventListener("click", this.handleClick.bind(this));
        this.scaleX=S;
        this.scaleY=S;
        this.addChild(this.bitmap);
        this.text = new createjs.Text(this._titleText, "bold 30px Courier",this._color);
        
        this.data = {
            framerate: 10,
            images: [explosion],
            frames: {width:64, height:64, regX:32, regY:32,count:10},
            animations: {'explode': [0, 10,false]}
        }
        
        this.spritesheet = new createjs.SpriteSheet(this.data);

        this.animation = new createjs.Sprite(this.spritesheet, 'explode');
        this.addEventListener("click", this.handleClick.bind(this));
        this.text.y = this.baloonWidth-10;
        console.log(this.baloonWidth);
        console.log(this.text.y);
        this.text.x = (this.baloonWidth*0.75);
        this.solution = solution;
        this.positivescore = positivescore;
        this.scoring = scoring;
        this.text.addEventListener("click", this.textOnClick.bind(this));
        //this.bitmap.addEventListener("click", this.handleClick.bind(this));
        this.addChild(this.text);
        this.bitmapscore = new createjs.Bitmap(this.positivescore);
        this.bitmapscore.scaleX=S*1.5;
        this.bitmapscore.scaleY=S*1.5;
        this.bitmapscore.x =  this.baloonWidth*0.5;
        this.bitmapscore.y =  this.baloonWidth*0.5;
        
        
    }

    Baloonc.prototype.textOnClick = function(){
        //alert('clicl from text');
    }
    Baloonc.prototype.handleClick = function (){
        //alert('process click');
        this.removeChild(this.bitmap);
        this.removeChild(this.text);
        console.log('clicked: '+this.x);
        console.log('clicked: '+this.y);
        //this.animation.x = this.x;
        //this.animation.y = this.y;
        //this.animation.play();
        this.animation.gotoAndPlay('explode');
        this.addChild(this.animation);
        //createjs.Sound.play(JMP.SOUNDS.POP,null,0,0,0,0.8);
        createjs.Sound.play('pop',{volume:1});
        if (this.solution===true){
            this.pop=true;
            this.poptick=0;
            this.scoring.score=this.scoring.score+20;
            createjs.Sound.play('tadam',{volume:1});
            //this.addChild(this.bitmapscore);
            //this.removeChild(this.bitmapscore);
            
        }else{
            this.pop=true;
            this.poptick=0;
            //if (this.scoring.score>0){
                //this.scoring.score=this.scoring.score-5;
            //} 

        }
        //this.animation.stop();

    }

    Baloonc.prototype._tick = function () {
        this.Container_tick();
        if (this.pop===true){
            if(this.solution===true){
                this.addChild(this.bitmapscore);
            }
            
            this.poptick++;
            if (this.poptick >10){
                if(this.solution===true){
                    this.removeChild(this.bitmapscore);
                }
                this.pop=false;
                //console.log('score '+this.scoring);
                
                //this.scoring[score] +=;
            }
        }
        if (this.y>-200){
            this.y+=this.velocity.y;
            //console.log(this.y);
            
        }
        
        //console.log("Icon Ticked");
    }
    window.Baloonc= Baloonc;
} (window));