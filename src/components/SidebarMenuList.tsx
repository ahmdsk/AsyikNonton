import NavbarDrawerLink from "./NavbarDrawerLink";

export default function SidebarMenuList() {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 h-full bg-base-200">
        {/* Sidebar content here */}
        <NavbarDrawerLink />
      </ul>
    </div>
  );
}
