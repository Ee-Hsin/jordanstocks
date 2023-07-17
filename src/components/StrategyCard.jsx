export const StrategyCard = ({ title, content, image }) => {
  return (
    <div className="w-full md:mx-5 p-2 md:hover:scale-105 h-full">
      {/* put image in div, set minimum height */}
      <div className="min-h-[200px]">
        <img
          src={image}
          className="p-2 mx-auto mb-5 min-w-[250px] rounded-2xl"
        />
      </div>
      <h1 className="text-2xl mb-2">{title}</h1>
      <p className="px-5">{content}</p>
    </div>
  )
}
