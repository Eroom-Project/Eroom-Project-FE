import "./App.css";
import Router from "./shared/Router";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "react-query";
import GlobalStyle from "./styles/GlobalStyle";
import NavBar from "./components/Common/NavBar";
import Footer from "./components/Common/Footer";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle/>
        <NavBar/>
        <Router />
        <Footer/>
      </QueryClientProvider>
    </>
  );
}

export default App;
