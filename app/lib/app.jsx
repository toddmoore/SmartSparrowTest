import React from 'react';
import easeljs from 'easeljs';
import { ImageLoader, Utilies } from './utils';

export class VelocityInput extends React.Component {
  constructor(){
    super();
  }
  getValue(value){
    value = (value*2)-100;
    return value > 0 ? (-value) : Math.abs(value)
  }
  render(){
    let value = this.getValue(this.props.value);
    return (
      <fieldset>
        <label className="label">Velocity (km/s)</label>
        <input className="input small" id="VelocityInput" defaultValue={value} value={value} ref="VelocityInput" type="number"></input>
      </fieldset>
    )
  }
}

export class RangeComponent extends React.Component {
  constructor(){
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      value: 50
    }
  }

  handleInputChange(event){
    this.setState({
      value: parseInt(event.target.value)
    });
  }

  render(){
    return (
      <div>
        <VelocityInput value={this.state.value} />
        <input type="range" className="RangeComponent" ref="input"
          onChange={this.handleInputChange}
          onInput={this.handleInputChange}

          /*
            Unfortunately React has a bug with range inputs
            with IE11, so until that is fixed Im assigning the events
            to mouseUp and keyUp so as it maintain functionality
          */
          onMouseUp={this.handleInputChange}
          onKeyUp={this.handleInputChange}

          min={0}
          max={100}
          defaultValue={this.state.value}
          value={this.state.value}
          step={1} />

        <Canvas position={this.state.value} />
      </div>

    )
  }
}

export class Canvas extends React.Component {
  constructor(){
    super();
    this.name = "CanvasElement";
    this.minp = 0;
    this.maxp = 100;
    this.minv = Math.log(100);
    this.maxv = Math.log(10000000);

    this.state = {
      bgImageSrc: 'public/images/sun.png',
      width: window.innerWidth,
      height: window.innerHeight,
      image: null
    };
  }

  applyColor(image){
    if(!image) return;
    let filter = new createjs.ColorFilter(this.red,this.green,this.blue,1,0,0,0,0);
    image.filters = [filter];
    image.cache(0,0,image.image.width,image.image.height)
  }

  componentWillMount() {
    var resize = Utilies.debounce(()=>{
      this.handleResize();
    }, 50);
    this.resize = window.addEventListener('resize', resize);
  }

  createImage(image){
    return new createjs.Bitmap(image);
  }

  generateMatrix(red,green,blue){
    return {
      red: red,
      green: green,
      blue: blue
    }
  }

  createRedMatrix(position){
    let offset = Math.abs((-position+100)/100)+0.5;
    return this.generateMatrix(1,offset,offset);
  }

  createBlueMatrix(position){
    let offset = Math.abs(((position+this.minp)/10000000)-1);
    // The last value generates a strange number
    // A little hack as I'm not a math genius :)
    if(offset < 1){
        return this.generateMatrix(offset,offset,1);
    }
  }

  createStage(ref){
    return new createjs.Stage(React.findDOMNode(ref));
  }

  createTicker(fps, ref){
    createjs.Ticker.setFPS(fps);
    createjs.Ticker.addEventListener("tick", ref);
  }

  componentDidMount(){
    let image;
    let el = this.createStage(this.refs.CanvasElement);
    this.createTicker(32, el);

    image = new ImageLoader(this.state.bgImageSrc).then((image)=>{
      image = this.createImage(image);
      this.updateStage(el, image);
      this.setState({
        image: image
      });
    });
  }

  centerImage(obj){
    if(!obj) return;
    obj.x = (window.innerWidth/2)-(obj.image.width/2);
    obj.y = (window.innerHeight/2)-(obj.image.height/2);
  }

  handleResize(){
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  // Taken from http://stackoverflow.com/questions/846221/logarithmic-slider
  // Log scale, I'll be honest I'm not all that familar with scales
  // So I had to find an example to implement it.
  logSlider(position){
    var scale = (this.maxv-this.minv) / (this.maxp-this.minp);
    return Math.exp(this.minv + scale*(position-this.minp));
  }

  render(){
    let position = this.logSlider(this.props.position);
    // We don't apply the red filter until we hit a hard limit of 141
    let colorMatrix = position > 141 ? this.createBlueMatrix(position) : this.createRedMatrix(position);
    this.applyColor.call(colorMatrix, this.state.image);
    this.centerImage(this.state.image);

    return (
      <div>
          <canvas ref="CanvasElement"
              width={this.state.width}
              height={this.state.height}
              className={this.name}  />
      </div>

    )
  }
  updateStage(stage, obj){
    stage.addChild(obj);
    stage.update();
  }

}
Canvas.propTypes = {
  position: React.PropTypes.number
}


export class Application extends React.Component {
  constructor(){
    super();
  }
  render(){
    return (
      <section>
        <RangeComponent />
      </section>
    )
  }

}
