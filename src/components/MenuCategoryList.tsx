"use client";
import { ICategory } from "@/interface/Category";
import SiteConfig from "@/lib/SiteConfig";
import Link from "next/link";
import { useEffect, useState } from "react";

import { FiChevronDown } from "react-icons/fi";

export default function MenuCategoryList() {
  const [categories, setCategories] = useState<Array<ICategory>>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`${SiteConfig.apiURL}/category`);
      const data: Array<ICategory> = await res.json();

      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <li>
      <div className="dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} className="flex items-center gap-2">Kategori <FiChevronDown /></label>
        <ul
          tabIndex={0}
          className={`dropdown-content shadow p-2 rounded-box bg-base-100 ${
            categories.length > 0 ? "h-[200px] overflow-y-scroll" : ""
          } z-[10]`}
        >
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <li key={index}>
                <Link href={category.slug}>{category.name}</Link>
              </li>
            ))
          ) : (
            <li>
              <a>Tidak Ada Kategori</a>
            </li>
          )}
        </ul>
      </div>
    </li>
  );
}
