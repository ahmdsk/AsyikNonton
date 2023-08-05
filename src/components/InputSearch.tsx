"use client";
import SiteConfig from "@/lib/SiteConfig";
import useLayoutStore from "@/store/LayoutStore";
import { useState } from "react";

interface IProps {
  btnColor?: string;
}

export default function SearchBar({ btnColor }: IProps) {
  const { setSearch, setLoading } = useLayoutStore((state) => state);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
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
        <button className={`btn ${btnColor} join-item`} onClick={() => handleSearch()}>Cari</button>
      </div>
    </div>
  );
}
