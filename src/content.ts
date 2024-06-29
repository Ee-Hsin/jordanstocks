import castleMoatImg from "./img/CastleMoat.jpg"
import watchImg from "./img/WatchResized.jpg"
import coinsImg from "./img/CoinsResized.jpg"
import {
  NavSection,
  StrategyItem,
  PerformanceFigure,
} from "./types/contentTypes"

export const LAST_UPDATED_DATE: string = "December 31st 2023"

export const TRANSACTION_SKIPS: number = 5

export const MONTHNAMES: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export const STRATEGYSECTION: StrategyItem[] = [
  {
    title: "Identify Great Companies",
    desc: "Great companies generate high returns on capital and have wide economic moats to protect those returns",
    img: castleMoatImg,
  },
  {
    title: "Pay good prices",
    desc: "A great company can be a bad investment if we pay too much, aim to buy great companies at reasonable prices",
    img: coinsImg,
  },
  {
    title: "Hold for the long run",
    desc: "Invest with a 3-5 year time horizon and limit annual turnover to 20-33%",
    img: watchImg,
  },
]

export const PERFORMANCEFIGURES: PerformanceFigure[] = [
  {
    from: "December 31st 2022:",
    burungPerf: "49.88%",
    sp500Perf: "24.73%",
  },
  {
    from: "Inception (September 2nd 2022):",
    burungPerf: "33.57%",
    sp500Perf: "21.55%",
  },
  {
    from: "Annualized since Inception:",
    burungPerf: "24.47%",
    sp500Perf: "15.90%",
  },
]

export const FOOTERNAVS: NavSection[] = [
  {
    label: "Resources",
    items: [
      {
        href: "/letters",
        name: "Letters",
      },
      {
        href: "/blog",
        name: "Blog",
      },
    ],
  },
  {
    label: "Get In Touch",
    items: [
      {
        href: "/signin",
        name: "Sign In",
      },
      {
        href: "/contact",
        name: "Contact Me",
      },
    ],
  },
]

// export const PORTFOLIO = [
//   {
//     company: "Meta Platforms Inc",
//     ticker: "META",
//     units: 110,
//     price: 286.98,
//     currency: "USD",
//     value: 31567,
//   },
//   {
//     company: "Alphabet Inc.",
//     ticker: "GOOGL",
//     units: 181,
//     price: 119.7,
//     currency: "USD",
//     value: 21665,
//   },
//   {
//     company: "Adobe Inc",
//     ticker: "ADBE",
//     units: 20,
//     price: 488.99,
//     currency: "USD",
//     value: 9779,
//   },
// ]
