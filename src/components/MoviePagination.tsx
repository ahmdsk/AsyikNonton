import useLayoutStore from "@/store/LayoutStore";
import { useState } from "react";

interface IProps {
  page: number;
  totalPage: number;
}

export default function MoviePagination({ page, totalPage }: IProps) {
  const pageArray = Array.from(Array(totalPage).keys());

  const { pageActive, setPageActive, setLoading } = useLayoutStore((state) => state);

  const changeActivePage = (page: number) => {
    setLoading(true);
    setPageActive(page);
  }

  return (
    <div className="join max-w-sm sm:max-w-md overflow-x-scroll">
      {pageArray.map((item) => (
        <button
          className={`join-item btn btn-md ${
            pageActive == item + 1 ? "btn-active" : ""
          }`}
          key={item}
          onClick={() => changeActivePage(item + 1)}
        >
          {item + 1}
        </button>
      ))}
    </div>
  );
}
