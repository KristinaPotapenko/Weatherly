import type { JSX } from "react";
import { AppRoutes } from "./routes/Routes/AppRoutes";
import { Loader } from "./react/popups/Loader/Loader";
import { useSelector } from "react-redux";
import { selectLoading } from "./features/appStatusSlice";

function App(): JSX.Element {
  const isLoading = useSelector(selectLoading);

  return (
    <>
      {isLoading && <Loader />}
      <main>
        <div>
          <AppRoutes />
        </div>
      </main>
    </>
  );
}

export default App;
