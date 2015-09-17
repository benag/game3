

var MBSound = {

    my_media:undefined,
    registerSound: function(){
        if (config.global.registerSound === 'sound.js'){
            this.registerSoundJSSound();
        }
        if (config.global.registerSound === 'cordova'){
            this.registerCordovaSound();
        }
    },
    registerCordovaSound: function() {
        this.my_media.play();
    },
    registerSoundJSSound: function(){
        var compileArray = [createjs.HTMLAudioPlugin,
            //createjs.WebAudioPlugin
        ];

        if (config.global.compileWith === 'coccon'){
            compileArray.push(createjs.CocoonJSAudioPlugin);
        }
        if (config.global.compileWith === 'cordova'){
            compileArray.push(createjs.CordovaAudioPlugin);
        }
        var registeredPlugins = createjs.Sound.registerPlugins([

            //createjs.CocoonJSAudioPlugin,
            //createjs.WebAudioPlugin,
            createjs.CordovaAudioPlugin,
            createjs.HTMLAudioPlugin
        ]);
        if (registeredPlugins) {
            createjs.Sound.alternateExtensions = ['m4a'];
            //createjs.Sound.addEventListener("loadComplete",createjs.proxy(soundsLoaded,this));
            var audioPath = "img/sfx/";
            var manifest = [
                {id: "pop", src: "pop.ogg"},
                //{id:"success", src:"xylophone-1.wav"},
                //{id:"back", src:"DST-Azum.mp3"}
                {id: "back", src: "amik.ogg"},
                {id: "tadam", src: "tada3.ogg"},
                {id: "finishLevel", src: "triumphal.wav"}];

            createjs.Sound.addEventListener("fileload", this.handleLoad);
            createjs.Sound.registerManifest(manifest, audioPath);
        }
    },
    handleLoad:function(event){
        if (event.src === 'img/sfx/amik.ogg') {
            alert('completed loading sound');
            createjs.Sound.play("back", {volume: 0.3, loop: -1});
        }
    },


};