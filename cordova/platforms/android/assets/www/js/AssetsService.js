


var AssetsService = {
    assets:undefined,
    init: function(next){
        this.assets = new AssetFactory();
        this.assets.scaleMethod = ndgmr.nativeScale;
        this.assets.onComplete = next;
    },
    registerAssets: function() {
        this.assets.loadAssets([
            config.assets.BACKGROUNDURL,
            config.assets.BLUBALOON,
            config.assets.GREENBALOON,
            config.assets.REDBALLOON,
            config.assets.EXPLOSIONURL,
            config.assets.UPPERSCORE,
            config.assets.NEGATIVESCORE,
            config.assets.POSITIVESCORE,
            config.assets.CHILDIMAGE,
            config.assets.TITLEII,
            config.assets.INSTRUCTBIT,
            config.assets.STOPMUSIC,
            config.assets.BUTTOMLINE,
            config.assets.UPPERLINE,
            config.assets.STAR,
            config.assets.SCORE20LARGE
        ]);
    }

};
