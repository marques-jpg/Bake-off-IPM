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
      // Vermelhos e Castanhos (A-D)
      a: [180, 0, 0],      // Vermelho Puro
      b: [110, 0, 0],      // Vinho/Bordeaux
      c: [200, 70, 0],     // Laranja Escuro Brilhante
      d: [110, 50, 20],    // Castanho Terra

      // Laranjas e Olivas (E-H)
      e: [160, 100, 0],    // Ouro Escuro
      f: [130, 130, 0],    // Mostarda / Oliva Claro
      g: [80, 90, 0],      // Verde Oliva Médio
      h: [55, 75, 25],     // Verde Tropa Profundo

      // Verdes (I-K)
      i: [0, 110, 0],      // Verde Floresta
      j: [0, 70, 40],      // Verde Garrafa
      k: [30, 100, 80],    // Verde Mar / Turquesa

      // AZUIS: Diferenciação L-O
      l: [0, 140, 140],    // Ciano Petróleo (Mais esverdeado)
      m: [20, 80, 200],    // Azul Real (Mais aberto e elétrico)
      n: [0, 40, 120],     // Azul Marinho Clássico
      o: [30, 30, 80],     // Azul Noite / Indigo

      // ROXOS E QUENTES: Diferenciação P-U
      p: [100, 0, 180],    // Roxo Violeta (Frio)
      q: [150, 0, 150],    // Magenta Puro (Vibrante)
      r: [160, 0, 80],     // Framboesa / Carmesim (Rosado)
      s: [130, 40, 60],    // Ameixa / Marsala (Misto/Sóbrio)
      t: [180, 60, 20],    // Tijolo / Terracota (Laranja-Avermelhado)
      u: [140, 90, 40],    // Bronze / Ocre Escuro

      // Finalização (V-Z)
      v: [100, 100, 120],  // Cinza Lavanda
      w: [70, 70, 70],     // Cinza Médio
      x: [100, 60, 50],    // Rosa Velho Mate
      y: [40, 60, 60],     // Ardósia
      z: [25, 25, 25]      // Quase Preto
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
