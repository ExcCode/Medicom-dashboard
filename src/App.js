import { Routes, Route } from "react-router-dom";
import RootRoutes from "./routes/RootRoutes";
import Header from "./client/components/header";
import Footer from "./client/components/footer";

function App() {
  return (
    <Routes>
      {RootRoutes.routes.map((route, index) => {
        return (
          <Route path={route.path} element={route.component} key={index} />
        );
      })}
    </Routes>
  );
}

export default App;
