import castleMoatImg from "./img/CastleMoat.jpg"
import watchImg from "./img/WatchResized.jpg"
import coinsImg from "./img/CoinsResized.jpg"

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
    serayaPerf: "35.70%",
    sp500Perf: "16.38%",
  },
  {
    from: "Inception (September 2nd 2022):",
    serayaPerf: "20.93%",
    sp500Perf: "13.41%",
  },
  {
    from: "Annualized since Inception:",
    serayaPerf: "25.94%",
    sp500Perf: "16.49%",
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

export const letters = [
  {
    title: "Bi-Annual Interim Letter 2023",
    date: "July 2023",
    href: "https://firebasestorage.googleapis.com/v0/b/seraya-cd251.appspot.com/o/letters%2FSeraya%20Bi-Annual%20Interim%20Letter%202023.pdf?alt=media&token=1222792f-91c5-46e8-a521-06fdbe9a732a",
  },
  {
    title: "Founding Letter",
    date: "February 2023",
    href: "https://firebasestorage.googleapis.com/v0/b/seraya-cd251.appspot.com/o/letters%2FSeraya%20Partnership%20Founding%20Letter.pdf?alt=media&token=f47c67e9-e91f-484d-ba8a-0c897eb6fa6a",
  },
]
