"use client";
import { ICategory } from "@/interface/Category";
import SiteConfig from "@/lib/SiteConfig";
import { useEffect, useState } from "react";

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
      <details className="dropdown dropdown-bottom dropdown-end">
        <summary>Kategori</summary>
        <ul
          className={`dropdown-content p-2 bg-base-100 ${
            categories.length > 0 ? "h-[200px] overflow-y-scroll" : ""
          }`}
        >
          {categories.length > 0 ? categories.map((category, index) => (
            <li key={index}>
              <a>{category.name}</a>
            </li>
          )) : (
            <li>
                <a>Tidak Ada Kategori</a>
            </li>
          )}
        </ul>
      </details>
    </li>
  );
}
