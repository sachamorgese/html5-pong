class Text {
  constructor(text = '', style = {}) {
    this.pos = { x: 0, y: 0 };
    this.text = text;
    this.style = style;
  }
  
  updateText(text) {
    this.text = text;
  }
}

export default Text;
