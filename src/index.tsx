import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./root/App";
import reportWebVitals from "./reportWebVitals";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <Toaster />
    <App />
  </>
);

reportWebVitals();
