// Target class (position and width)
class Target
{
  constructor(x, y, w, h, l, id)
  {
    this.x      = x;
    this.y      = y;
    this.width  = w;
    this.height = h; 
    this.label  = l;
    this.id     = id;
    this.isHit = false;
  }
  
  // Checks if a mouse click took place
  // within the target (using rectangular bounding box)
  clicked(mouse_x, mouse_y)
  {
    let half_w = this.width / 2;
    let half_h = this.height / 2;
    return (mouse_x >= this.x - half_w && mouse_x <= this.x + half_w &&
            mouse_y >= this.y - half_h && mouse_y <= this.y + half_h);
  }

  getColorByInitial()
  {
    const firstChar = (this.label).trim().charAt(0).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Palette of 11 colors
    const palette = [
      [45, 85, 130],    
      [120, 70, 100],   
      [55, 110, 85],    
      [140, 105, 55],   
      [160, 75, 75],    
      [90, 105, 120],   
      [110, 95, 60],    
      [130, 90, 110],   
      [75, 100, 120],   
      [145, 125, 85],   
      [95, 80, 105]     
    ];

    // Assign color based on alphabetical order
    let charCode = firstChar.charCodeAt(0) - 97;
    if (charCode < 0 || charCode > 25) charCode = 0; 

    const rgb = palette[charCode % palette.length];
    return color(rgb[0], rgb[1], rgb[2]);
  }
  
  // Draws the target (i.e., a rectangle)
  // and its label
  draw()
  {
    // Draw target as a rectangle
    fill(this.getColorByInitial());
    if (this.clicked(mouseX, mouseY)) {
      stroke(255);       // White stroke on hover
      strokeWeight(3);   
    } else {
      noStroke();        // No stroke otherwise
    }
    
    rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);

    // Identify initial letter
    let myChar = this.label.trim().charAt(0).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Check if it's the first of its group
    let myIndex = targets.indexOf(this);
    let isFirstOfGroup = false;

    if (myIndex === 0) {
      isFirstOfGroup = true;
    } else if (myIndex > 0) {
      let prevChar = targets[myIndex - 1].label.trim().charAt(0).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (prevChar !== myChar) {
        isFirstOfGroup = true;
      }
    }

    // Draw a small box with the initial letter
    if (isFirstOfGroup) {
      let boxSize = 25; 
      let boxX = this.x - this.width / 2; 
      let boxY = this.y - this.height / 2;
      
      fill(255, 255, 255, 220); 
      rect(boxX, boxY, boxSize, boxSize);
      
      fill(0); 
      textFont("Arial", 18);
      textStyle(BOLD);
      textAlign(CENTER, CENTER);
      text(myChar, boxX + boxSize / 2, boxY + boxSize / 2 + 1);
    }
    
    // Replace spaces with line breaks
    let multiLineLabel = this.label.trim().split(' ').join('\n');
    let lines = multiLineLabel.split('\n');

    // Draw label
    textFont("Arial");
    textStyle(BOLD);
    
    let fontSize = 18;
    textSize(fontSize);
    textLeading(13);
    
    let padding = 8; 
    
    // Dynamically adjust font size to fit bounding box
    while (fontSize > 6) {
      let maxLineWidth = 0;
      
      for (let i = 0; i < lines.length; i++) {
        let lw = textWidth(lines[i]);
        if (lw > maxLineWidth) {
          maxLineWidth = lw;
        }
      }
      
      let totalTextHeight = lines.length * (fontSize * 0.9);
      
      if (maxLineWidth <= (this.width - padding) && totalTextHeight <= (this.height - padding)) {
        break; 
      }
      
      fontSize--;
      textSize(fontSize);
      textLeading(fontSize * 0.9);
    }

    if (this.isHit) {
      fill(color(255, 255, 0)); // Yellow if hit
    } else {
      fill(color(255, 255, 255)); // White by default
    }
    stroke(0);        
    strokeWeight(2);
    textAlign(CENTER, CENTER); 
    
    text(multiLineLabel, this.x, this.y);
    noStroke(); 
  }
}