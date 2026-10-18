// import { Box, Home, Info, Menu, User, X } from "lucide-react";
// import { useState } from "react";
// import { NavLink, Outlet } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";

// function Asidebar({ isOpen, setIsOpen, isOpenDesktop, setIsOpenDesktop }) {
//   const nav_item = [
//     {
//       label: "Home",
//       to: "/",
//       icon: Home,
//     },
//     {
//       label: "About",
//       to: "/about",
//       icon: Info,
//     },
//     {
//       label: "Product",
//       to: "/product",
//       icon: Box,
//     },
//     {
//       label: "User",
//       to: "/user",
//       icon: User,
//     },
//   ];
//   return (
//     <div className="">
//       <AnimatePresence>
//         {/* Mobile Phone screen*/}
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, width: 0 }}
//             animate={{ opacity: 1, width: "16rem" }}
//             exit={{ opacity: 0, width: 0 }}
//             transition={{ duration: 0.3 }}
//             className="bg-gray-200 shadow-lg md:hidden fixed left-0 w-64 h-full z-50"
//           >
//             <div className="flex flex-row justify-between px-5 py-2 border-b border-b-black">
//               <div className="font-medium ">Pos system</div>
//               <button
//                 onClick={() => {
//                   setIsOpen(!isOpen);
//                 }}
//                 className="md:hidden p-1 border-2 border-gray-600 rounded transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
//               >
//                 <X />
//               </button>
//             </div>
//             <div className="px-3 py-2 flex flex-col gap-3">
//               {nav_item.map((item, index) => {
//                 const Icon = item.icon;
//                 return (
//                   <NavLink
//                     className={({ isActive }) =>
//                       `p-2 rounded-xl flex flex-row items-center gap-2 ${
//                         isActive
//                           ? "bg-blue-700 text-white"
//                           : "hover:text-gray-200 hover:bg-gray-700"
//                       }`
//                     }
//                     key={index}
//                     to={item?.to}
//                   >
//                     <Icon className="size-7" />
//                     <div className="">{item?.label}</div>
//                   </NavLink>
//                 );
//               })}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {/* Desktop screen*/}
//         {isOpenDesktop && (
//           <motion.div
//             initial={{ opacity: 0, width: 0 }}
//             animate={{ opacity: 1, width: "16rem" }}
//             exit={{ opacity: 0, width: 0 }}
//             transition={{ duration: 0.3 }}
//             className="bg-gray-200 shadow-lg hidden md:block fixed left-0 w-64 h-full"
//           >
//             <div className="flex flex-row justify-between px-5 py-2 border-b border-b-black">
//               <div className="font-medium ">Pos system</div>
//               <button
//                 onClick={() => {
//                   setIsOpenDesktop(!isOpenDesktop);
//                 }}
//                 className="p-1 border-2 border-gray-600 rounded transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
//               >
//                 <X />
//               </button>
//             </div>
//             <div className="px-3 py-2 flex flex-col gap-3">
//               {nav_item.map((item, index) => {
//                 const Icon = item.icon;
//                 return (
//                   <NavLink
//                     className={({ isActive }) =>
//                       `p-2 rounded-xl flex flex-row items-center gap-2 ${
//                         isActive
//                           ? "bg-blue-700 text-white"
//                           : "hover:text-gray-200 hover:bg-gray-700"
//                       }`
//                     }
//                     key={index}
//                     to={item?.to}
//                   >
//                     <Icon className="size-7" />
//                     <div className="">{item?.label}</div>
//                   </NavLink>
//                 );
//               })}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default function MainLayout() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isOpenDesktop, setIsOpenDesktop] = useState(true);

//   return (
//     <div className=" min-h-screen flex flex-row">
//       {/* AsideBar */}
//       <Asidebar
//         isOpen={isOpen}
//         setIsOpen={setIsOpen}
//         isOpenDesktop={isOpenDesktop}
//         setIsOpenDesktop={setIsOpenDesktop}
//       />
//       {/* WorkSpace */}
//       <div
//         className={` flex-1 flex flex-col ${isOpenDesktop ? "md:ml-64" : ""}`}
//       >
//         {/* Header */}
//         <header className=" px-5 py-2 flex flex-row items-center justify-between z-40 sticky top-0 shadow-lg bg-gray-400">
//           {/* Desktop */}
//           <button
//             onClick={() => {
//               setIsOpenDesktop(!isOpenDesktop);
//             }}
//             className="hidden md:inline-flex p-1 border-2 border-gray-600 rounded transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
//           >
//             <Menu />
//           </button>
//           {/* Mobile Phone */}
//           <button
//             onClick={() => {
//               setIsOpen(!isOpen);
//             }}
//             className="md:hidden p-1 border-2 border-gray-600 rounded transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
//           >
//             <Menu />
//           </button>
//           <h1>Dashboard</h1>
//         </header>
//         {/* Container */}
//         <main className=" flex-1">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
