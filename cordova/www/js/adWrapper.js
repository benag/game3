

var addWrapper ={
    admobid: {},
    init: function() {
        if( /(android)/i.test(navigator.userAgent) ) { // for android
            this.admobid = {
                banner: 'ca-app-pub-6990634179643061/7261071924',
                interstitial: 'ca-app-pub-6990634179643061/6746904326'
            };
        } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
            this.admobid = {
                banner: 'ca-app-pub-xxx/zzz',
                interstitial: 'ca-app-pub-xxx/kkk'
            };
        } else { // for windows phone
            this.admobid = {
                banner: 'ca-app-pub-xxx/zzz', // or DFP format "/6253334/dfp_example_ad"
                interstitial: 'ca-app-pub-xxx/kkk'
            };
        }
    }
};


