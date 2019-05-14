String.prototype.strpos = function(e) {
  return this.indexOf(e)!=-1;
};

Device = function() {
  function Device() {
    var s = this;
    function a(f) {
      var e = document.createElement("div"),
      d = "Khtml ms O Moz Webkit".split(" "),
      c = d.length;
      if (f in e.style) {
        return true;
      }
      f = f.replace(/^[a-z]/, function (g) {
        return g.toUpperCase();
      });
      while (c--) {
        if (d[c] + f in e.style) {
          return true;
        }
      }
      return false;
    }
    this.agent = navigator.userAgent.toLowerCase();
    this.detect = function (d) {
      if (typeof d === "string") 
          d = [d];
      for (var c = 0; c < d.length; c++) 
        if (this.agent.strpos(d[c])) {
          return true;
        }
      return false;
    };
    this.browser = {};
    this.browser.chrome = this.detect("chrome");
    this.browser.safari = !this.browser.chrome && this.detect("safari");
    this.browser.firefox = this.detect("firefox");
    this.browser.ie = this.detect("msie");
    this.browser.old = this.detect(["msie 6", "msie 7", "msie 8", "firefox/3", "safari/3", "safari/4"]);
    this.browser.version = function () {
      if (s.browser.chrome) 
        return Number(s.agent.split("chrome/")[1].split(".")[0]);
      if (s.browser.firefox) 
        return Number(s.agent.split("firefox/")[1].split(".")[0]);
      if (s.browser.safari) 
        return Number(s.agent.split("version/")[1].split(".")[0].charAt(0));
      if (s.browser.ie) 
        return Number(s.agent.split("msie ")[1].split(".")[0]);
    }();
    
    this.mobile = !! ("ontouchstart" in window) ? {} : false;
    if (this.mobile) {
      this.mobile.tablet = window.innerWidth >= 640 || window.innerHeight >= 640;
      this.mobile.phone = !this.mobile.tablet;
      this.mobile.motion = typeof window.DeviceMotionEvent !== "undefined";
    }
    
    this.screen = function() {
      var screen = (window.innerWidth >= 1280) ? "desktop" : (window.innerWidth < 1024 && window.innerWidth >= 640) ? "tablet" : "mobile";  
      return screen;
    }();
        
    this.system = {};
    this.system.flash = !!(navigator.mimeTypes["application/x-shockwave-flash"] || window.ActiveXObject && new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
    this.system.webworker = typeof window.Worker !== "undefined";
    this.system.websocket = typeof window.WebSocket !== "undefined";
    this.system.offline = !! window.applicationCache;
    this.system.geolocation = "geolocation" in navigator;
    this.system.pushstate = typeof window.history.pushState !== "undefined";
    this.system.hashchange = typeof window.onhashchange !== "undefined";
    this.system.webrtc = !! (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    this.system.webaudio = typeof window.webkitAudioContext !== "undefined" || typeof window.AudioContent !== "undefined";
    this.system.fullscreen = function() {
      var e = document.documentElement;
      return !! (e.requestFullscreen || e.mozRequestFullScreen || e.webkitRequestFullScreen);
    }();
    this.system.language = function() {
      var b = window.navigator.userLanguage || window.navigator.language;
      return b.split("-")[0];
    }();
    this.system.localStorage = function () {
      try {
        return "localStorage" in window && window.localStorage !== null;
      } catch (c) {
        return false;
      }
    }();
    this.system.os = function () {
      if (s.detect("mac os")) 
          return "mac";
      if (s.detect("windows nt 6.2")) 
          return "windows8";
      if (s.detect("windows nt 6.1")) 
          return "windows7";
      if (s.detect("windows nt 6.0")) 
          return "vista";
      if (s.detect("windows nt 5.1")) 
          return "xp";
      if (s.detect("linux")) 
          return "linux";
      return "undetected";
    }();
    this.media = {};
    this.media.audio = function () {
      if ( !! document.createElement("audio").canPlayType) 
        return s.detect(["firefox", "opera"]) ? "ogg" : "mp3";
      else 
        return false;
    }();
    this.media.video = function () {
      var c = document.createElement("video");
      if (!! c.canPlayType) {
        if (s.mobile) 
            return "mp4";
        if (s.browser.chrome) 
            return "webm";
        if (s.browser.firefox || s.browser.opera) {
            if (c.canPlayType('video/webm; codecs="vorbis,vp8"')) {
              return "webm";
            }
            return "ogv";
        }
        return "mp4";
      } else {
        return false;
      }
    }();
    this.graphics = {};
    this.graphics.svg = typeof window.SVGSVGElement !== "undefined";
    this.graphics.retina = window.devicePixelRatio > 1 ? true : false;
    this.graphics.webgl = typeof window.WebGLRenderingContext !== "undefined";
    this.graphics.canvas = function () {
      var c = document.createElement("canvas");
      return c.getContext ? true : false;
    }();
    this.styles = {};
    this.styles.filter = a("filter") && !s.browser.firefox;
    this.styles.needsFix = function () {
      if (s.detect("msie 7")) 
          return "ie7";
      if (s.detect("msie 8")) 
          return "ie8";
      return false;
    }();
    this.styles.vendor = function () {
      if (s.browser.firefox) 
        return "-moz-";
      if (s.browser.opera) 
        return "-o-";
      if (s.browser.ie) 
        return "-ms-";
      return "-webkit-";
    }();
    this.tween = {};
    this.tween.transition = a("transition");
    this.tween.css2d = a("transform");
    this.tween.css3d = a("perspective");
    this.tween.complete = function () {
      if (s.browser.firefox || s.detect("msie 10")) 
          return "transitionend";
      if (s.browser.opera) 
          return "oTransitionEnd";
      if (s.browser.ie) 
          return "msTransitionEnd";
      return "webkitTransitionEnd";
    }();
  }
  return new Device();
}();