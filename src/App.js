import { UserPage } from "./Users";
import { createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const GlobalStyle = createGlobalStyle`
  body {
    background-color:#eaeaea;
    min-height: 100vh;
    margin:0;
    padding:0;

  }
`;

function App() {
  return (
    
    <Provider store={store}>
      <GlobalStyle />
      <UserPage />
      <ToastContainer />
    </Provider>
  );
}

export default App;
