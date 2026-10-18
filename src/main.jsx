import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { TooltipProvider } from "./components/ui/tooltip";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <TooltipProvider>
          <App />
        </TooltipProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
