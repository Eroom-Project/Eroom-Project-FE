import "./App.css";
import Router from "./shared/Router";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "react-query";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Router />
      </QueryClientProvider>
    </>
  );
}

export default App;
