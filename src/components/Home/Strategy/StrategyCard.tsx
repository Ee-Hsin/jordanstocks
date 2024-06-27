interface StrategyCardProps {
  img: string
  title: string
  desc: string
  idx: number
}

export const StrategyCard = ({ img, title, desc, idx }: StrategyCardProps) => {
  return (
    <li className={`feature-${idx + 1} space-y-3 py-3 lg:px-12 sm:py-0`}>
      <div className="min-h-[150px]">
        <img
          src={img}
          className="p-2 mx-auto mb-5 min-w-[250px] rounded-2xl"
          loading="lazy"
        />
      </div>
      <h4 className="text-lg text-gray-800 font-semibold">{title}</h4>
      <p>{desc}</p>
    </li>
  )
}
