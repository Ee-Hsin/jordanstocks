import { Link } from "react-router-dom"
import { FOOTERNAVS } from "../../content"
import { SubscribeBlogComponent } from "../Blog/SubscribeBlogComponent"
import React from 'react';
import { NavSection } from "../../types/contentTypes";

export const Footer: React.FC = () => {
  return (
    <footer className="text-gray-500 bg-white px-4 py-5 md:pt-10 max-w-screen-xl mx-auto md:px-8">
      <div className="gap-6 justify-between md:flex">
        <div className="flex-1 pl-2">
          <div className="max-w-xs">
            <h3 className="text-indigo-600 font-semibold text-xl">Blog</h3>
            {/* <img src="https://www.floatui.com/logo.svg" className="w-32" /> */}
            {/* <p className="leading-relaxed mt-2 text-[15px]">
              Lorem Ipsum has been the {"industry's"} standard dummy text ever
              since the 1500s.
            </p> */}
          </div>
          <SubscribeBlogComponent variant={"footer"} />
        </div>
        <div className="hidden flex-1 mt-10 space-y-6 items-center justify-evenly sm:flex md:space-y-0 md:mt-0">
          {FOOTERNAVS.map((item: NavSection, idx: number) => (
            <ul className="space-y-4" key={idx}>
              <h4 className="text-gray-800 font-medium">{item.label}</h4>
              {item.items.map((el, idx) => (
                <li key={idx}>
                  <Link
                    to={el.href}
                    className="hover:underline hover:text-indigo-600"
                  >
                    {el.name}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="mt-8 border-t items-center justify-between sm:flex"></div>
    </footer>
  )
}
