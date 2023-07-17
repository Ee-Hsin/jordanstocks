export const StrategyCard = ({ title, content, image }) => {
  return (
    <div
      className="w-full h-full 
    p-2 pb-6 lg:p-2 md:mx-3 md:hover:scale-105 
    mb-5 lg:mb-2 border-b-2 border-[#4B491A] lg:border-none"
    >
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
