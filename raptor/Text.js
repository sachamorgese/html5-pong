class Text {
  constructor(text = '', x = 0, y = 0, style = {}) {
    this.pos = { x, y };
    this.text = text;
    this.style = style;
  }
}

export default Text;
