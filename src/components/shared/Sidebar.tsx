"use client";
import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  CreditCardIcon,
  GlobeAltIcon,
  QueueListIcon,
  MoonIcon,
  SunIcon,
  HomeIcon,
  XMarkIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Bars3Icon, LinkIcon, UsersIcon } from "@heroicons/react/24/outline";
import { QrCodeIcon, ChartBarIcon } from "@heroicons/react/20/solid";
import { signOut } from "next-auth/react";
import NextLink from "next/link";
import { Button } from "@mui/material";



// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// @ts-ignore
export default function Siderbar({ session , userDetail }) {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(true);

  const pathname = usePathname(); // Initialize the useRouter hook
  let allpages = [
    { name: "Dashboard", href: "/admin", icon: HomeIcon, current: true , module : null},
    { name: "Users", href: "/admin/user", icon: UsersIcon, current: false , module : "User Management" },
    { name: "Roles", href: "/admin/role", icon: LockClosedIcon, current: false , module : "Role Management" },
    { name: "Account", href: "/admin/account", icon: UserIcon, current: false , module : null },
  ];
  let navigation = allpages.filter((page) => page?.module == null || userDetail.role.permissions.filter((permission : any) => permission.module == page.module)[0]);
  // Update the current property of navigation items based on the current pathname
  navigation = navigation.map((item) => ({
    ...item,
    current: pathname === item.href,
  }));

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-foreground-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 " aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-background px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <>Logo</>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul
                      role="list"
                      className="flex flex-1 flex-col gap-y-7 mt-5 text-foreground"
                    >
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? 'bg-indigo-500 relative bg-opacity-20 text-indigo-500 after:bg-indigo-500 after:content-["1"] after:absolute after:left-0 after:w-1 after:overflow-hidden after:rounded-lg'
                                    : " hover: hover:bg-background-100",
                                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                )}
                              >
                                <item.icon
                                  className={classNames(
                                    item.current ? "" : " group-hover:",
                                    "h-6 w-6 shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      {}
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col  overflow-y-auto bg-background  pb-4 border-r-1 ">
          <div className="flex h-16 shrink-0 items-center px-6 ">
            <>Logo</>
          </div>
          <nav className="flex flex-1 flex-col px-6  border-r">
            <ul role="list" className="flex flex-1 flex-col mt-5 gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-indigo-500 relative bg-opacity-20 text-indigo-500 after:bg-indigo-500 after:content-["1"] after:absolute after:left-0 after:w-1 after:overflow-hidden after:rounded-lg'
                            : " hover: hover:bg-background-100",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current ? "" : " group-hover:",
                            "h-6 w-6 shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="">
        <div className="h-16"></div>
        <div className=" fixed w-full top-0 z-40 flex h-16 shrink-0 items-center gap-x-4   px-4 shadow-sm shadow-background-100 border-b sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5  lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <QueueListIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div
            className="h-6 w-px bg-foreground-900/10 lg:hidden"
            aria-hidden="true"
          />

          <div className="flex flex-1 gap-x-4 self-stretch justify-end lg:gap-x-6">
            <div className="flex items-center gap-x-4 lg:gap-x-6 ">
              {/* Separator */}
              <div
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-foreground-900/10"
                aria-hidden="true"
              />

              {/* Profile dropdown */}
              <Menu as="div" className="relative">
                <Menu.Button className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full bg-foreground-50"
                    src={`https://eu.ui-avatars.com/api/?length=2&background=black&color=fff&name=${session.user.name}}`}
                    alt=""
                    width={32}
                    height={32}
                  />
                  <span className="hidden lg:flex lg:items-center">
                    <span
                      className="ml-4 text-sm font-semibold leading-6 "
                      aria-hidden="true"
                    >
                      {session.user.name}
                    </span>
                    <ChevronDownIcon
                      className="ml-2 h-5 w-5 -400"
                      aria-hidden="true"
                    />
                  </span>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2.5 min-w-[250px] origin-top-right rounded-md bg-white border py-2 shadow-lg shadow-background-100  focus:outline-none">
                    <Menu.Item key={"email"}>
                      <div className="flex items-center gap-x-3 px-4 py-2 text-foreground hover:bg-background w-full">
                        <img
                          className="h-8 w-8 rounded-full bg-foreground-50"
                          src={`https://eu.ui-avatars.com/api/?length=2&background=black&color=fff&name=${session.user.name}}`}
                          alt=""
                          width={32}
                          height={32}
                        />
                        <div className="flex flex-col">
                          <p className="font-bold">{session.user.name}</p>
                          <p className="text-sm">{session.user.email}</p>
                        </div>
                      </div>
                    </Menu.Item>
                    <Menu.Item key={"signout"}>
                      <div className="text-center">
                        <Button
                          variant="contained"
                          onClick={() => {
                            signOut();
                          }}
                          className="w-[90%] mx-auto"
                        >
                          Sign Out
                        </Button>
                      </div>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
