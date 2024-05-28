import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { vars, classes } from "@repo/themes";

function App() {
  const theme = {
    colors: vars.colors.$static.light,
  };

  return (
    <ThemeProvider theme={theme}>
      <View />
    </ThemeProvider>
  );
}

const View = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <Text className='heading4xl'>
          font color is {vars.colors.$static.light.red[500]}
          {vars.box.radii.base}
        </Text>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

const Text = styled.p`
  /* ${classes.typography.heading["4xl"]}; */
  color: ${vars.colors.$static.light.red[500]};
`;

export default App;
