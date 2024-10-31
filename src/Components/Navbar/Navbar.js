import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { BreadCrumb } from '../BreadCrumb/BreadCrumb';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navbarRef = useRef(null);
    const toggleMenu = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };
    const handleClickOutside = (event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    return (_jsxs("nav", { ref: navbarRef, className: "bg-transparent text-fontColor", children: [_jsxs("div", { className: "container mx-auto px-4 flex items-center justify-between h-16", children: [_jsx("div", { className: "text-2xl font-semibold", children: "\u062C\u0648\u0627\u0632\u064A" }), _jsxs("div", { className: "hidden md:flex space-x-4 gap-5", children: [_jsx("a", { href: "/", className: "hover:text-gray-200", children: "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0647" }), _jsx("a", { href: "/about", className: "hover:text-gray-200", children: "\u0645\u0633\u0627\u0639\u062F\u0647" }), _jsx("a", { href: "/services", className: "hover:text-gray-200", children: "\u0639\u0631\u0648\u0636" }), _jsx("a", { href: "/contact", className: "hover:text-gray-200", children: "\u0628\u0627\u0642\u0627\u062A" })] }), _jsx("div", { className: "md:hidden", children: _jsx("button", { onClick: toggleMenu, className: "text-primaryColor focus:outline-none", children: isOpen ? _jsx(X, { size: 24 }) : _jsx(Menu, { size: 24 }) }) })] }), _jsx(BreadCrumb, {}), isOpen && (_jsxs("div", { className: "md:hidden bg-primaryColor text-white", children: [_jsx("a", { href: "/", className: "block py-2 px-4 hover:bg-primary-light", children: "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0647" }), _jsx("a", { href: "/about", className: "block py-2 px-4 hover:bg-primary-light", children: "\u0645\u0633\u0627\u0639\u062F\u0647" }), _jsx("a", { href: "/services", className: "block py-2 px-4 hover:bg-primary-light", children: "\u0639\u0631\u0648\u0636" }), _jsx("a", { href: "/contact", className: "block py-2 px-4 hover:bg-primary-light", children: "\u0628\u0627\u0642\u0627\u062A" })] }))] }));
};
export default Navbar;
