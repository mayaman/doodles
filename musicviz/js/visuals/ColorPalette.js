class ColorPalettes {
  constructor() {
    this.palettes = {};
    this.numberOfPalettes = 0;
  }

  addColor(title, backgroundColor, color0, color1, color2, color3, color4, color5) {
    this.palettes[title] = [backgroundColor, color0, color1, color2, color3, color4, color5];
    this.numberOfPalettes++;
  }
}
