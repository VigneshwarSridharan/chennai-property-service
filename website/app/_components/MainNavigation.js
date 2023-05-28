"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MainNavigation = () => {
  const pathName = usePathname();
  return (
    <nav id="navbar" className="navbar">
      <ul>
        <li>
          <Link href={"/"} className={pathName === "/" ? "active" : ""}>
            Home
          </Link>
        </li>

        <li>
          <Link
            href="/about"
            className={pathName.startsWith("/about") ? "active" : ""}
          >
            About
          </Link>
        </li>
        {/* <li>
          <Link
            href="/"
            className={pathName.startsWith("/services") ? "active" : ""}
          >
            Services
          </Link>
        </li> */}
        <li>
          <Link
            href="/properties"
            className={pathName.startsWith("/properties") ? "active" : ""}
          >
            Properties
          </Link>
        </li>

        <li>
          <Link
            href={"/contact"}
            className={pathName.startsWith("/contact") ? "active" : ""}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
