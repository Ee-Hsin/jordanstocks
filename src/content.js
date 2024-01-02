import castleMoatImg from "./img/CastleMoat.jpg"
import watchImg from "./img/WatchResized.jpg"
import coinsImg from "./img/CoinsResized.jpg"

export const MONTHNAMES = [
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

export const STRATEGYSECTION = [
  {
    title: "Identify Great Companies",
    desc: "Great companies generate high returns on capital and have wide economic moats to protect those returns",
    img: castleMoatImg,
  },
  {
    title: "Pay good prices",
    desc: "A great company can be a bad investment if we pay too much, we aim to buy great companies at reasonable prices",
    img: coinsImg,
  },
  {
    title: "Hold for the long run",
    desc: "We invest with a 3-5 year time horizon. We limit our annual turnover to 20-33%. This compares to most active funds with turnover ratios over 100%!",
    img: watchImg,
  },
]

export const PERFORMANCEFIGURES = [
  {
    from: "December 31st 2022:",
    serayaPerf: "49.88%",
    sp500Perf: "24.73%",
  },
  {
    from: "Inception (September 2nd 2022):",
    serayaPerf: "33.57%",
    sp500Perf: "21.55%",
  },
  {
    from: "Annualized since Inception:",
    serayaPerf: "24.47%",
    sp500Perf: "15.90%",
  },
]

export const FOOTERNAVS = [
  {
    label: "Partnership",
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
    label: "Resources",
    items: [
      {
        href: "/signin",
        name: "Sign In",
      },
      {
        href: "/contact",
        name: "Contact Us",
      },
    ],
  },
]

export const PORTFOLIO = [
  {
    company: "Meta Platforms Inc",
    ticker: "META",
    units: 110,
    price: 286.98,
    currency: "USD",
    value: 31567,
  },
  {
    company: "Alphabet Inc.",
    ticker: "GOOGL",
    units: 181,
    price: 119.7,
    currency: "USD",
    value: 21665,
  },
  {
    company: "Adobe Inc",
    ticker: "ADBE",
    units: 20,
    price: 488.99,
    currency: "USD",
    value: 9779,
  },
]
