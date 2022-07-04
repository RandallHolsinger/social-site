import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers/index";

export default configureStore({
  reducer: {reducers}
}) 