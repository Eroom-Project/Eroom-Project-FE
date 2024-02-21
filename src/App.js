import "./App.css";
import Router from "./shared/Router";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "react-query";
import GlobalStyle from "./styles/GlobalStyle";
import { CookiesProvider } from "react-cookie";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <Router />
      </QueryClientProvider>
    </CookiesProvider>
    </>
  );
}

export default App;
