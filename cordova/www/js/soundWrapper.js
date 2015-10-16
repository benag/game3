var MBSound = {

    back: undefined,
    pop: undefined,
    tadam: undefined,
    finishLevel: undefined,
    registerSound: function () {
        if (config.global.registerSound === 'sound.js') {
            this.registerSoundJSSound();
        }
        if (config.global.registerSound === 'cordova') {
            this.registerCordovaSound();
        }
    },
    registerCordovaSound: function () {
        if (config.global.registerSound === 'cordova') {
            //MBSound.my_media = new Media('cdvfile://localhost/img/sfx/amik.ogg',
            //my_media = new Media('cdvfile://localhost/www/img/sfx/amik.ogg',
            this.back = new Media('/android_asset/www/img/sfx/B-3.mp3', function () {}, function (err) {});
            this.pop  = new Media('/android_asset/www/img/sfx/pop.ogg', function () {}, function (err) {});
            this.tadam = new Media('/android_asset/www/img/sfx/tada3.ogg', function () {}, function (err) {});
            this.finishLevel = new Media('/android_asset/www/img/sfx/triumphal.wav', function () {}, function (err) {});
        }
    },
    play: function (soundToPlay,volume, loop) {
        var settings = {};
        if (volume != undefined ){
            settings.volume = volume;
        }
        if (loop != undefined ){
            settings.loop = loop;
        }
        if (config.global.registerSound === 'sound.js'){
            createjs.Sound.play(soundToPlay, settings );
        }else{
            this[soundToPlay].play();
        }

    },
    registerSoundJSSound: function () {
        var compileArray = [createjs.HTMLAudioPlugin
            //createjs.WebAudioPlugin
        ];

        if (config.global.compileWith === 'coccon') {
            compileArray.push(createjs.CocoonJSAudioPlugin);
        }
        if (config.global.compileWith === 'cordova') {
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
            createjs.Sound.on("fileload", this.handleLoad, this);
            createjs.Sound.registerSound("img/sfx/pop.ogg", "pop");
            createjs.Sound.registerSound("img/sfx/amik.ogg", "back");
            createjs.Sound.registerSound("img/sfx/tada3.ogg", "tadam");
            createjs.Sound.registerSound("img/sfx/triumphal.wav", "finishLevel");
        }
    },
    handleLoad: function (event) {
        alert('inside handleLoad');
        if (event.src === 'img/sfx/amik.ogg') {
            alert('completed loading sound');
            createjs.Sound.play("back", {volume: 0.3, loop: -1});
        }
    }

};

//createjs.Sound.addEventListener("fileload", this.handleLoad, this);
//createjs.Sound.addEventListener("loadComplete",createjs.proxy(soundsLoaded,this));
//var audioPath = "img/sfx/";
//var manifest = [
//    {id: "pop", src: "pop.ogg"},
//    //{id:"success", src:"xylophone-1.wav"},
//    //{id:"back", src:"DST-Azum.mp3"}
//    {id: "back", src: "amik.ogg"},
//    {id: "tadam", src: "tada3.ogg"},
//    {id: "finishLevel", src: "triumphal.wav"}];


//createjs.Sound.registerManifest(manifest, audioPath);

