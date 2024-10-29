import { useEffect } from "react";
import { RootLayout } from "./Components/RootLayout/RootLayout";

function App() {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl"); // Change to 'ltr' if needed
  }, []);
  return <RootLayout />;
}

export default App;
