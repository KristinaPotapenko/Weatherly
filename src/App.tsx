import type { JSX } from "react";
import { AppRoutes } from "./routes/Routes/AppRoutes";

function App(): JSX.Element {
  return (
    <main>
      <div>
        <AppRoutes />
      </div>
    </main>
  );
}

export default App;
