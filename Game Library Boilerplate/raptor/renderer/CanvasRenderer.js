class CanvasRenderer {
  constructor(w, h) {
    const canvas = document.createElement('canvas');
    this.w = canvas.width = w;
    this.h = canvas.height = h;
    this.view = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.textBaseline = 'top';
  }

  render(container) {
    const { ctx } = this;
    function renderRec(container) {
      // Render the container children
      container.children.forEach(child => {
        ctx.save();
        // Draw the leaf node
        if (child.pos) {
          ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y));
        }
        if (child.text) {
          const { font, fill, align } = child.style;
          if (font) ctx.font = font;
          if (fill) ctx.fillStyle = fill;
          if (align) ctx.textAlign = align;
          ctx.fillText(child.text, 0, 0);
        }
        if (child.children) {
          renderRec(child);
        }
        ctx.restore();
      });
    }

    ctx.clearRect(0, 0, this.w, this.h);
    renderRec(container);
  }
}

export default CanvasRenderer;
