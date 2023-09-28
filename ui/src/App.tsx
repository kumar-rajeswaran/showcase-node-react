import { ThemeProvider } from "react-bootstrap";
import { AppRouter } from "./routers";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persister, store } from "store";
import "./assets/styles/common.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <ThemeProvider breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]} minBreakpoint="xxs">
          <AppRouter />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
