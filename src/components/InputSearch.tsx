"use client";
import useLayoutStore from "@/store/LayoutStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IProps {
  btnColor?: string;
}

enum SearchType {
  "reset",
  "search",
}

export default function SearchBar({ btnColor }: IProps) {
  const router = useRouter();

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
    router.push("/");
  };

  return (
    <div className="join">
      <div>
        <input
          className="input join-item w-full md:w-[280px] text-zinc-800"
          placeholder="Cari..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAction(SearchType.search)}
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
