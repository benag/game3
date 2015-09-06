(function (scope) { 
      function AssetFactory() { 
      this.initialize(); 
      } 
      var p = AssetFactory.prototype; 
     
      p.initialize = function() { 
	      this.assetsToLoad = 0; 
	      this.assetsLoaded = 0; 
        this.scale=1;
        this.scaleMethod=null;
      } 
    
      p.loadAssets = function(array) { 
	      for (var c = 0; c < array.length; c++) { 
	      	this.loadAsset(array[c]); 
    	  } 
      } 
     
      p.loadAsset = function(url) { 
	      var image = new Image(); 
	      this[url] = image; 
	      this.assetsToLoad++; 
	      image.onload = this.onImageLoaded.bind(this);
	     
	      image.src = image.url = url;
      } 
     
      p.onImageLoaded = function(e) { 
         if ( this.scale != 1 && this.scaleMethod ) {
           this[e.target.url] = this.scaleMethod(e.target,this.scale);
           //if the scaled result in an image,
           //we have to wait for the load-event
             if( this[e.target.url].src ) {
              this[e.target.url].onload = this.onImageScaled.bind(this);
              return;
             }
         } 
         //if its not an image, we can trigger the
         //scaled sub-sequence-method right away
         this.onImageScaled(this[e.target.url]);
      }
      p.onImageScaled = function(e) {
       this.assetsLoaded++;
       if ( this.assetsLoaded == this.assetsToLoad ) {
        if ( this.onComplete ) this.onComplete();
       }
      }
     
      scope.AssetFactory = AssetFactory; 
    } (window));