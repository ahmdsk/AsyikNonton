import InputSearch from "./InputSearch";
import { BsSearch } from "react-icons/bs"

export default function SearchBar() {
  return (
    <>
      <div className="hidden lg:block">
        <InputSearch />
      </div>
      <div className="flex lg:hidden">
        <div className="dropdown dropdown-bottom dropdown-left">
          <label tabIndex={0} className="btn btn-sm m-1">
            <BsSearch />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] bg-base-200 w-[300px] rounded-full"
          >
            <li>
              <InputSearch btnColor="btn-neutral" />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
