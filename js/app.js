
var canvas,stage,ONCE=true,assets,
baloonURL,
backgrondURL,
blueBaloon,
grennBaloon,
baloon,
background,
image,
bitmap,
explosionURL,
STATE='INTRO',
startURL,
activeBaloons=0,
currentCycle=0,
maxCycles=10,
baloons=[],
positiveScoreURL,
negatievScore,
TickBetweenCycles=200,
IntroBetweenCycles = 15,
tickIncycle=199,
scoring={},
scoreText,
childImage,
ThreeBaloons,
start,
menu,
childbitmap,
ThreeBaloonsBitmap,
menuBitmap,
startBitmap,
stopMusic=false,
titleIIbitmap,
CW,
CH,
S,
instructBit,
filterBackURL,
speed=0.8,
score20L,
star,
level=1,
endLevel,
tmpTick=1,
yourscourse,
startingLevel,
filterBack;


    
   


   function init() { 
	     // creating the canvas-element 
      canvas = document.createElement('canvas');
      window.addEventListener('resize', resize, false);
      console.log('screen width: '+ndgmr.getScreenWidth());
      //CW=ndgmr.getScreenWidth();
      //CH=ndgmr.getScreenHeight();
      //S = Math.min(CW/800,CH/480);
      //S = ndgmr.snapValue(S*(window.devicePixelRatio||1),0.5);
      //canvas.width = CW;
      //canvas.height=CH;
      //canvas.width= window.innerWidth;
      //canvas.height= window.innerHeight;
      S=1;
      canvas.width= 550;
      canvas.height= 700;
      scoring.score=0;
      canvas.style.position = "absolute";
	    canvas.style.left = 500+"px";
      canvas.style.top = 100+"px"; 
	    //canvas.width = canvaswidth; 
	    //canvas.height = 550; 
	    document.body.appendChild(canvas); 
	   
	    // initializing the stage 
	    stage = new createjs.Stage(canvas);
	    createjs.Touch.enable(stage);//only for mobile 
      assets = new AssetFactory();
      console.log('scale is: '+S);
      //assets.scale = S; 
      //assets.scaleMethod = ndgmr.nearestNeighborScale; 
      assets.scaleMethod = ndgmr.nativeScale;
      assets.onComplete = assetsLoaded;
	     blueBaloon = 'assets/BlueB.png';
      grennBaloon = 'assets/GreenB.png';
      redBaloon = 'assets/RedB.png';
      backgrondURL = 'assets/BG_1.jpg';
      filterBackURL = 'assets/blueLayer.png';
      explosionURL = 'assets/bubbles.png';
      upperscore = 'assets/upper-score.png';
      negatievScore = 'assets/scoringminus5.png';
      positiveScoreURL = 'assets/scoring20.png';
      childImage = 'assets/boy.png';
      titleII = 'assets/title.png';
      instructBit = 'assets/text_button.png',
      stopmusic='assets/Sound-off-icon.png' ;
      buttomLine = 'assets/botttom-score.png';
      upperLine = 'assets/upper-score.png';
      score20Large = 'assets/score20Large.png';
      star = 'assets/star.png';
      start='';
      menu='';
      startURL = '';
      assets.loadAssets([
        backgrondURL,
        blueBaloon,
        grennBaloon,
        redBaloon,
        explosionURL,
        upperscore,
        negatievScore,
        positiveScoreURL,
        childImage,
        titleII,
        instructBit,
        stopmusic,
        buttomLine,
        upperLine,
        star,
        score20Large

      ]);
      loadSounds();
      resize();
   } 

   function resize(){
    
    //canvas.width= window.innerWidth;
    //canvas.height= window.innerHeight

   }  
   function loadSounds() { 
     var registeredPlugins = createjs.Sound.registerPlugins([ 
       createjs.CocoonJSAudioPlugin, 
       createjs.WebAudioPlugin, 
       createjs.HTMLAudioPlugin 
      ]); 
       if (registeredPlugins) { 
           createjs.Sound.alternateExtensions = ['m4a'];
           createjs.Sound.addEventListener("loadComplete",createjs.proxy(this.soundsLoaded,this)); 
           var audioPath = "assets/sfx/";
       var manifest = [
          {id:"pop", src:"pop.ogg"},
          //{id:"success", src:"xylophone-1.wav"},
          //{id:"back", src:"DST-Azum.mp3"}
          {id:"back", src:"amik.ogg"},
          {id:"tadam", src:"tada3.ogg"},
          {id:"finishLevel", src:"triumphal.wav"},

          ];
        createjs.Sound.addEventListener("fileload", handleLoad);
        createjs.Sound.registerManifest(manifest, audioPath); 
           
           
        } 
    } 
   function stopSound(){
    if (stopMusic===true){
      createjs.Sound.play("back",{volume:0.3,loop:-1});
      stopMusic=false;

    }else{
      createjs.Sound.stop();
      stopMusic=true;
    }
    
   }
   function handleLoad(event) {
      //createjs.Sound.play(event.src);
      //alert('completed loading sound');
      console.log(event);
      if (event.src==='assets/sfx/amik.ogg'){
        createjs.Sound.play("back",{volume:0.3,loop:-1});
      }
      
   }
   
   function addI(res,x,y,call){
    var bitmap = new createjs.Bitmap(assets[res]);
    if (x!=null){
      bitmap.x=x;
    }
    if (y!=null) {
      bitmap.y=y;

    }
    if (call!=null){
      bitmap.on("click",call);
    }
    stage.addChild(bitmap);
    return bitmap;
   }

  function handleInstructClick(evt, data){

    stage.removeAllChildren();
    stage.addChild(background);
    var music = addI(stopmusic,10,7,stopSound);
    addI(upperLine,0,0,undefined);
    addI(buttomLine,0,(canvas.height-30),undefined);
    stage.setChildIndex(music,2);
    scoreText = new createjs.Text(scoring.score, "bold 25px Courier","#ffffff");
    scoreText.x =234;
    scoreText.y =19;
    stage.addChild(scoreText);
    STATE='GAME';

   }
   function assetsLoaded(e) { 
      
      background = new createjs.Bitmap(assets[backgrondURL]); 
      //background.scaleX = S*2;
      background.scaleY = S*1.5;
      stage.addChild(background);

      filterBack = new createjs.Bitmap(assets[filterBackURL]); 
      //filterBack.scaleX = S*2;
      filterBack.scaleY = S*1.5;
      stage.addChild(filterBack);

      childbitmap = new createjs.Bitmap(childImage);
      childbitmap.x =  300;
      childbitmap.y =  230;
      stage.addChild(childbitmap);

      startBitmap = new createjs.Bitmap(instructBit);
      startBitmap.x=30;
      startBitmap.y=420;
      startBitmap.on("click", handleInstructClick);
      
      
      stage.addChild(startBitmap);
      titleIIbitmap = new createjs.Bitmap(titleII);
      titleIIbitmap.x=90;
      titleIIbitmap.y=40;
      stage.addChild(titleIIbitmap);
      addI(stopmusic,10,10,stopSound);
      createjs.Ticker.setFPS(30); 
      createjs.Ticker.addEventListener("tick", onTick);
   } 
   
   
   function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
    }

    function placePick(){
      var baloonwidth=50;
      var viewWidth=canvas.width;
      var parcels = viewWidth/baloonwidth;
      var placment = Math.floor(Math.random()*(parcels-1));
      //console.log('placment:'+placment*baloonwidth); 
      return placment*baloonwidth;
    }

    function exist(array,place){
      for (var i=0;i < array.length;i++){
        if (array[i]===place) return true;
      }
      return false;

    }
    function getPlaceArray(){
      var Array=[];
      var num=5;
      var place;
      for (var i=0;i<num;i++){
        place = placePick();
        while (exist(Array,place)){
          place = placePick();
        }
        Array[i]=place;

      }
      return Array;
      
    }
    function randomIntFromInterval(min,max){
      
      return Math.floor(Math.random()*(max-min+1)+min);
    }
    function colorPick(){
      var colorpicker = Math.floor(Math.random()*3); 

      var color;
      if (colorpicker===0) return redBaloon;
      if (colorpicker===1) return blueBaloon;
      if (colorpicker===2) return grennBaloon;
    }
    function setRound(){
      var number1=randomIntFromInterval(2,9)
      var number2=randomIntFromInterval(2,9)
      var number3 = number1*number2;
      var number4  = Math.floor(Math.random()*100);
      var number5  = Math.floor(Math.random()*100);
      var placment = Math.floor(Math.random()*12);
      var placeArray = getPlaceArray();
      baloons[0]= new Baloonc(50,assets[colorPick()],"#ffffff",
                              number1,assets[explosionURL],placeArray[0],canvas.height,
                              false,assets[score20Large],scoring,speed,S*0.85);
      baloons[1]= new Baloonc(50,assets[colorPick()],"#ffffff",
                              number2,assets[explosionURL],placeArray[1],canvas.height,
                              false,assets[score20Large],scoring,speed,S*0.85);
      baloons[2]= new Baloonc(50,assets[colorPick()],"#ffffff",
                              number3,assets[explosionURL],placeArray[2],canvas.height,
                              true,assets[score20Large],scoring,speed,S*0.85);
      baloons[3]= new Baloonc(50,assets[colorPick()],"#ffffff",
                              number4,assets[explosionURL],placeArray[3],canvas.height,
                              false,assets[score20Large],scoring,speed,S*0.85);
      baloons[4]= new Baloonc(50,assets[colorPick()],"#ffffff",
                              number5,assets[explosionURL],placeArray[4],canvas.height,
                              false,assets[score20Large],scoring,speed,S*0.85);
      stage.addChild(baloons[2]); 
      stage.setChildIndex(baloons[2],1);
      stage.addChild(baloons[0]); 
      stage.setChildIndex(baloons[0],1);
      stage.addChild(baloons[1]);
      stage.setChildIndex(baloons[1],1);
      stage.addChild(baloons[3]);
      stage.setChildIndex(baloons[3],1);
      stage.addChild(baloons[4]);
      stage.setChildIndex(baloons[4],1);
          
    }
    function textOnClick(){
      
      stage.removeChild(startingLevel);
      speed=speed+0.4;
      currentCycle=1;
      tmpTick=1;
      STATE='GAME';
      scoring.score=0;
      createjs.Sound.play("back",{volume:0.3,loop:-1});
    }
    function setLevel(){
      if (tmpTick===1){
            STATE='INTRO';
            handleInstructClick();
            endLevel = new createjs.Text("End of Level "+level, "bold 40px Impact","#FF0000");
            endLevel.y = canvas.height*0.4;
            endLevel.x = canvas.width*0.2;
            stage.addChild(endLevel);
            createjs.Sound.stop();
            stopMusic=true;
            createjs.Sound.play('finishLevel',{volume:1});
            tmpTick++;
          }else{
            if (tmpTick===20){
              yourscourse = new createjs.Text("Your Score: "+scoring.score, "bold 40px Impact","#FF0000");
              yourscourse.y = canvas.height*0.4+40;
              yourscourse.x = canvas.width*0.2;
              stage.addChild(yourscourse);

            }
            if (tmpTick===100){
              stage.removeChild(endLevel);
              stage.removeChild(yourscourse);
              level++;
              startingLevel = new createjs.Text("Tap or Click to Start Level "+level, "bold 40px Impact","#FF0000");
              startingLevel.y = canvas.height*0.4;
              startingLevel.x = canvas.width*0.05;
              startingLevel.addEventListener("click", textOnClick.bind(this));
              stage.addChild(startingLevel);
            }
           if (tmpTick===100){
              // stage.removeChild(startingLevel);
              // speed=speed+0.2;
              // currentCycle=1;
              // tmpTick=1;
              // STATE='GAME';
              // scoring.score=0;
            }

            tmpTick++;
            
          }
    }
   // update the stage every frame 
   function onTick(e) {
   //console.log('starting tick'); 
    if (STATE==='GAME'){
      var scorenum = scoring.score;
      scoreText.text =scorenum.toString();
      tickIncycle++;
      if (tickIncycle===TickBetweenCycles){
        if (currentCycle===10){
          setLevel();
          tickIncycle--;
        }else{
          setRound();
         // currentCycle++;
          tickIncycle=0;

        }
        
        //console.log(scoring.score);
      }
    }
    if (STATE==='INTRO'){
        

    }
  

    stage.update();
       //stage.tick();
   //console.log('ending tick');    
   } 
   window.onload = init; 