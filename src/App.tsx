import type { JSX } from "react";
import { useSelector } from "react-redux";

import { AppRoutes } from "./routes/Routes/AppRoutes";
import { selectLoading } from "./features/appStatusSlice";

import { Loader } from "./react/popups/Loader/Loader";

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
