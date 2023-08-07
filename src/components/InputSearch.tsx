"use client";
import SiteConfig from "@/lib/SiteConfig";
import useLayoutStore from "@/store/LayoutStore";
import { useState } from "react";

interface IProps {
  btnColor?: string;
}

enum SearchType {
  "reset",
  "search",
}

export default function SearchBar({ btnColor }: IProps) {
  const { setSearch, setLoading, setPageActive } = useLayoutStore(
    (state) => state
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleAction = (type: SearchType) => {
    if (type === SearchType.reset) {
      setLoading(true);
      setPageActive(1);
      setSearch("");
      setSearchQuery("");

      return;
    }

    setLoading(true);
    setSearch(searchQuery);
    setSearchQuery("");
  };

  return (
    <div className="join">
      <div>
        <input
          className="input join-item w-full md:w-[280px]"
          placeholder="Cari..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="indicator">
        <div className="tooltip tooltip-bottom" data-tip="Reset Pencarian Film">
          <button
            className={`btn btn-error join-item`}
            onClick={() => handleAction(SearchType.reset)}
          >
            Reset
          </button>
        </div>
        <div className="tooltip tooltip-left" data-tip="Cari Film Yang Ingin Kamu Tonton">
          <button
            className={`btn ${btnColor} join-item`}
            onClick={() => handleAction(SearchType.search)}
          >
            Cari
          </button>
        </div>
      </div>
    </div>
  );
}
