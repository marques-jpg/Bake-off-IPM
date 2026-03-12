// Target class (position, width and height)
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
  }
  
  // Checks if a mouse click took place
  // within the target (now using rectangular bounding box logic)
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

    // Paleta de 11 cores (tons suaves/terra)
    const palette = [
      [45, 85, 130],    // steel blue
      [120, 70, 100],   // muted plum
      [55, 110, 85],    // sage green
      [140, 105, 55],   // warm amber
      [160, 75, 75],    // terracotta / brick red
      [90, 105, 120],   // slate gray
      [110, 95, 60],    // olive green
      [130, 90, 110],   // dusty rose
      [75, 100, 120],   // muted teal
      [145, 125, 85],   // dark sand
      [95, 80, 105]     // faded purple
    ];

    // Atribuir a cor baseando-se na ordem alfabética da letra (a=0, b=1, etc.)
    let charCode = firstChar.charCodeAt(0) - 97;
    if (charCode < 0 || charCode > 25) charCode = 0; // fallback para caracteres estranhos

    // Selecionar uma cor ciclicamente
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
      stroke(255);       // Borda branca
      strokeWeight(3);   // Grossura da borda
    } else {
      noStroke();        // Sem borda se o rato não estiver por cima
    }
    
    rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    noStroke();
    rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);

    // Identificar a letra inicial deste target
    let myChar = this.label.trim().charAt(0).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Verificar se é o primeiro do seu grupo (primeiro com esta letra)
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

    // Se for o início do grupo, desenha um pequeno quadrado no canto superior esquerdo com a letra
    if (isFirstOfGroup) {
      let boxSize = 25; 
      let boxX = this.x - this.width / 2; 
      let boxY = this.y - this.height / 2;
      
      fill(255, 255, 255, 220); 
      rect(boxX, boxY, boxSize, boxSize);
      
      fill(0); 
      textFont("Arial", 12);
      textAlign(CENTER, CENTER);
      text(myChar, boxX + boxSize / 2, boxY + boxSize / 2 + 1);
    }
    
    // Draw label
    textFont("Arial", 14);
    textStyle(BOLD);
    textLeading(13); // Mantém as linhas mais compactas umas das outras
    fill(color(255, 255, 255));
    stroke(0);        // Contorno preto
    strokeWeight(2);
    textAlign(CENTER, CENTER); 
    
      // Grossura do contorno (fino mas eficaz)
    
    // O grande truque: substitui os espaços por quebras de linha ("Enter").
    // Assim as palavras nunca são cortadas a meio!
    let multiLineLabel = this.label.trim().split(' ').join('\n');
    
    // Desenha o texto centrado no botão
    text(multiLineLabel, this.x, this.y);
    noStroke(); 
  }
}