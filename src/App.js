import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { RootLayout } from "./Components/RootLayout/RootLayout";
function App() {
    useEffect(() => {
        document.documentElement.setAttribute("dir", "rtl"); // Change to 'ltr' if needed
    }, []);
    return _jsx(RootLayout, {});
}
export default App;
