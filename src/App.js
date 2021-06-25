import { UserPage } from "./Users";
import { createGlobalStyle } from "styled-components";

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
    <>
      <GlobalStyle />
      <UserPage />
    </>
  );
}

export default App;
