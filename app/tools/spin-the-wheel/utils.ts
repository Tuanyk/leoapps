export function generateContrastingColors(numSegments: number): string[] {
    const colors = [];
    const hueIncrement = 360 / numSegments;
  
    for (let i = 0; i < numSegments; i++) {
      const hue = i * hueIncrement;
      colors.push(`hsl(${hue}, 100%, 50%)`);
    }
  
    return colors;
  }
  
  export function easeOut(t: number, b: number, c: number, d: number): number {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }
  
  export function fitText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, fontSize: number): string {
    ctx.font = `${fontSize}px Arial`;
    const ellipsis = '...';
    
    if (ctx.measureText(text).width <= maxWidth) {
      return text;
    }
    
    let textWidth = ctx.measureText(text + ellipsis).width;
    while (textWidth > maxWidth && text.length > 0) {
      text = text.slice(0, -1);
      textWidth = ctx.measureText(text + ellipsis).width;
    }
    
    return text + ellipsis;
  }
  
  