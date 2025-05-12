export const baseThemes = [
  {
    name: 'vercel',
    label: 'Vercel',
    activeColor: {
      light: 'oklch(0 0 0)',
      dark: 'oklch(1 0 0)'
    }
  },
  {
    name: 'mono',
    label: 'Mono',
    activeColor: {
      light: 'oklch(0.56 0 0)',
      dark: 'oklch(0.56 0 0)'
    }
  },
  {
    name: 't3chat',
    label: 'T3 Chat',
    activeColor: {
      light: 'oklch(0.53 0.14 355.20)',
      dark: 'oklch(0.46 0.19 4.10)'
    }
  },
  {
    name: 'retro-arcade',
    label: 'Retro Arcade',
    activeColor: {
      light: 'oklch(0.59 0.2 355.89)',
      dark: 'oklch(0.59 0.2 355.89)'
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
    label: 'Vintage Paper',
    activeColor: {
      light: 'oklch(0.62 0.08 65.54)',
      dark: 'oklch(0.73 0.06 66.7)'
    }
  },
  {
    name: 'amethyst-haze',
    label: 'Amethyst Haze',
    activeColor: {
      light: 'oklch(0.61 0.08 299.73)',
      dark: 'oklch(0.71 0.08 302.05)'
    }
  },
  {
    name: 'catppuccin',
    label: 'Catppuccin',
    activeColor: {
      light: 'oklch(0.55 0.25 297.02)',
      dark: 'oklch(0.79 0.12 304.77)'
    }
  },
  {
    name: 'notebook',
    label: 'Notebook',
    activeColor: {
      light: 'oklch(0.49 0 0)',
      dark: 'oklch(0.76 0 0)'
    }
  }
] as const;

export type BaseTheme = (typeof baseThemes)[number];
