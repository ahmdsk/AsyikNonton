import Menu from "@/lib/Menu";
import MenuCategoryList from "./MenuCategoryList";
import Link from "next/link";

export default function NavbarDrawerLink() {
  return (
    <>
      {Menu.map((item, index) => (
        <li key={index}>
          <Link href={item.pathname ?? '#'}>{item.label}</Link>
        </li>
      ))}
      <MenuCategoryList />
    </>
  );
}