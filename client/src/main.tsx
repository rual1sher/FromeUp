import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import { RoutePage } from "./common/routes/routes";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Toaster />
    <RoutePage />
  </BrowserRouter>
);
