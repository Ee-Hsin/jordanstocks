// Define the structure for each navigation item
export interface NavItem {
  href: string
  name: string
}

// Define the structure for each navigation section
export interface NavSection {
  label: string
  items: NavItem[]
}

export interface StrategyItem {
  title: string
  desc: string
  img: string // This assumes the images are imported and their resolved paths are strings
}

export interface PerformanceFigure {
  from: string
  burungPerf: string
  sp500Perf: string
}
