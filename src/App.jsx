

import {BrowserRouter, Routes, Route} from "react-router-dom";
import signup from "./pages/signup";
import login from "./pages/login";
import profile from "./pages/profile";
import transaction from "./pages/transaction";

function App() {
   return(
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/signup" element={<signup/>}/>
            <Route path="/login" element={<login/>}/>
            <Route path="/profile" element={<profile/>}/>
            <Route path="/transaction" element={<transaction/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
