class KeyControls {
  constructor() {
    this.keys = {};
    // Bind event handlers
    document.addEventListener(
      'keydown',
      e => {
        if ([37, 38, 39, 40].indexOf(e.which) >= 0) {
          e.preventDefault();
        }
        this.keys[e.which] = true;
      },
      false,
    );

    document.addEventListener(
      'keyup',
      e => {
        this.keys[e.which] = false;
      },
      false,
    );
  }
  
  y(up, down) {
    if (this.keys[up]) return -1;
    if (this.keys[down]) return 1;
    return 0;
  }
}

export default KeyControls;
