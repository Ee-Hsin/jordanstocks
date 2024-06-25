import { Link } from "react-router-dom"

interface BlogPreviewCardProps {
  id: string;
  img: string;
  title: string;
  date: string;
  description: string;
}

export const BlogPreviewCard: React.FC<BlogPreviewCardProps> = ({ id, img, title, date, description }) => {
  return (
    <li className="w-full mx-auto group sm:max-w-sm ">
      <Link to={id}>
        <img
          src={img}
          loading="lazy"
          alt={title}
          className="w-full md:w-[  320px] md:h-[200px] rounded-lg "
        />
        <div className="mt-3 space-y-2">
          <span className="block text-indigo-600 text-sm">{date}</span>
          <h3 className="text-lg text-gray-800 duration-150 group-hover:text-indigo-600 font-semibold">
            {title}
          </h3>
          <p className="text-gray-600 text-sm duration-150 group-hover:text-gray-800">
            {description.slice(0, 100) + "..."}
          </p>
        </div>
      </Link>
    </li>
  )
}
