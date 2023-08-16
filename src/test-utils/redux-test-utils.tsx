import { RenderResult, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";

const renderWithRedux = (testComponent: React.ReactNode): RenderResult => {
  return render(<Provider store={store}>{testComponent}</Provider>)
}
 export default renderWithRedux