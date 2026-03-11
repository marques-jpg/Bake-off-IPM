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
      a: [180, 0, 0],
      b: [110, 0, 0],
      c: [200, 70, 0],
      d: [110, 50, 20],
      e: [160, 100, 0],
      f: [130, 130, 0],
      g: [80, 90, 0],
      h: [55, 75, 25],
      i: [0, 110, 0],
      j: [0, 70, 40],
      k: [30, 100, 80],
      l: [0, 140, 140],
      m: [20, 80, 200],
      n: [0, 40, 120],
      o: [30, 30, 80],
      p: [100, 0, 180],
      q: [150, 0, 150],
      r: [160, 0, 80],
      s: [130, 40, 60],
      t: [180, 60, 20],
      u: [140, 90, 40],
      v: [100, 100, 120],
      w: [70, 70, 70],
      x: [100, 60, 50],
      y: [40, 60, 60],
      z: [25, 25, 25]
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
