// Target class (position and width)
class Target
{
  constructor(x, y, w, l, id)
  {
    this.x      = x;
    this.y      = y;
    this.width  = w;
    this.label  = l;
    this.id     = id;
  }
  
  // Checks if a mouse click took place
  // within the target
  clicked(mouse_x, mouse_y)
  {
    return dist(this.x, this.y, mouse_x, mouse_y) < this.width / 2;
  }

  getColorByInitial()
  {
    const firstChar = (this.label).trim().charAt(0).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    
    const letterColors = {
      a: [102, 204, 0],
      b: [230, 126, 34],
      c: [214, 48, 128],
      d: [44, 130, 201],
      e: [39, 174, 96],
      f: [99, 110, 114],
      g: [0, 102, 204],
      h: [230, 126, 34],
      i: [214, 48, 128],
      j: [44, 130, 201],
      k: [39, 174, 96],
      l: [99, 110, 114],
      m: [0, 102, 204],
      n: [230, 126, 34],
      o: [214, 48, 128],
      p: [44, 130, 201],
      q: [39, 174, 96],
      r: [99, 110, 114],
      s: [0, 102, 204],
      t: [230, 126, 34],
      u: [214, 48, 128],
      v: [44, 130, 201],
      w: [39, 174, 96],
      x: [99, 110, 114],
      y: [0, 102, 204],
      z: [230, 126, 34]
    };

    const rgb = letterColors[firstChar];
    return color(rgb[0], rgb[1], rgb[2]);
  }
  
  // Draws the target (i.e., a circle)
  // and its label
  draw()
  {
    // Draw target
    fill(this.getColorByInitial());
    circle(this.x, this.y, this.width);
    
    // Draw label
    textFont("Arial", 12);
    fill(color(255, 255, 255));
    textAlign(CENTER);
    text(this.label, this.x, this.y);
  }
}