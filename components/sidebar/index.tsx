"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { sidebarItems } from "@/data/sidebarItems";
import { GiHamburgerMenu } from "react-icons/gi";

const SideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const adminAuthPaths = useMemo(
    () => ["/admin/login", "/admin/resetpassword"],
    []
  );
  const showSidebar = !adminAuthPaths.includes(pathname || "");

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "logout" && event.newValue === "true") {
        if (!adminAuthPaths.includes(pathname || "")) {
          //   logout();
          router.push("/admin/login");
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [adminAuthPaths, pathname, router]);

  const isActive = (path: string) => {
    return pathname === path
      ? "text-[#343C6A] relative before:absolute before:-left-5 before:top-0 before:h-full before:w-1 before:bg-[#343C6A] rounded-tr-lg rounded-br-lg"
      : "hover:bg-gray-200";
  };

  const handleLogout = () => {
    // logout();
    localStorage.setItem("logout", "true");
    setTimeout(() => {
      localStorage.removeItem("logout");
    }, 500);
    router.push("/admin/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!showSidebar) return null;

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white text-[#B1B1B1] transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 w-64 z-50`}
      >
        <div className="w-full p-4 flex justify-left text-[#343C6A] font-bold text-xl">
          Halil İbrahim DEMİR
        </div>

        <div className="p-6 flex-1">
          <ul>
            {sidebarItems.map((item, index) => {
              if (item.isLogout) {
                return (
                  <li
                    key={index}
                    className="flex items-center gap-4 py-4 px-6 rounded-lg hover:text-[#343C6A] cursor-pointer"
                    onClick={handleLogout}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </li>
                );
              }

              return (
                <Link href={item.path} key={index}>
                  <li
                    className={`flex items-center hover:text-[#343C6A] gap-4 py-4 px-6 rounded-lg ${isActive(
                      item.path
                    )}`}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Hamburger button - positioned absolutely when sidebar is closed */}
      {!isSidebarOpen && (
        <button
          className="fixed top-4 left-4 p-2 text-[#343C6A] md:hidden z-40 bg-transparent rounded-md shadow-md"
          onClick={toggleSidebar}
        >
          <GiHamburgerMenu size={24} />
        </button>
      )}

      {/* Black transparent overlay */}
      <div
        className={`fixed inset-0 bg-black transition-all duration-300 ${
          isSidebarOpen
            ? "opacity-60 z-40 visible"
            : "opacity-0 -z-10 invisible"
        }`}
        onClick={toggleSidebar}
        aria-hidden="true"
      />
    </>
  );
};

export default SideBar;
