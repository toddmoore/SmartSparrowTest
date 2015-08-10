export const Utilies = {
  // David Walsh Debounce function
  // http://davidwalsh.name/javascript-debounce-function
  debounce: (func,wait,immediate)=>{
    let timeout;
    return function(){
      var context = this, args = arguments;
  		var later = function() {
  			timeout = null;
  			if (!immediate) func.apply(context, args);
  		};
	    var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    }
  }
}

export class ImageLoader {
  constructor(url){
    this.handleLoaded = this.handleLoaded.bind(this);
    this.handleImageError = this.handleImageError.bind(this);
    return new Promise((resolve, reject)=>{
      this.resolve = resolve;
      this.reject = reject;
      this.loadImage(url);
    });
  }
  handleLoaded(){
    this.resolve(this.raw);
  }
  handleImageError(event){
    this.reject(new Error(event));
  }
  loadImage(url){
    let raw;
    this.raw = raw = new Image();
    raw.src = url;
    raw.addEventListener('load', this.handleLoaded);
    raw.addEventListener('error', this.handleImageError);
    return this;
  }
}
