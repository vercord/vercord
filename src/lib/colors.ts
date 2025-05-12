export const baseColors = [
  {
    name: 'retro-arcade',
    label: 'Retro Arcade',
    activeColor: {
      light: 'oklch(0.59 0.2 355.89)',
      dark: 'oklch(0.59 0.2 355.89)'
    }
  },
  {
    name: 'kodama-grove',
    label: 'Kodama Grove',
    activeColor: {
      light: 'oklch(0.67 0.11 118.91)',
      dark: 'oklch(0.68 0.06 132.45)'
    }
  },
  {
    name: 'claude',
    label: 'Claude',
    activeColor: {
      light: 'oklch(0.56 0.13 43.00)',
      dark: 'oklch(0.56 0.13 43.00)'
    }
  },
  {
    name: 'claymorphism',
    label: 'Claymorphism',
    activeColor: {
      light: 'oklch(0.59 0.2 277.12)',
      dark: 'oklch(0.68 0.16 276.93)'
    }
  },
  {
    name: 'vintage-paper',
    label: 'Vintange Paper',
    activeColor: {
      light: 'oklch(0.62 0.08 65.54)',
      dark: 'oklch(0.73 0.06 66.7)'
    }
  }
] as const;

export type BaseColor = (typeof baseColors)[number];
