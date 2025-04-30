import styled from "styled-components"
import GlobalStyles from "../styles/GlobalStyles"

import Button from "../ui/Button"
import Input from "../ui/Input"

const H1 = styled.h1`
  font-size: 30px;
  color: red;
  font-weight: 600;
  background-color: yellow;
`

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`

function App() {

  return (
    <>
    <GlobalStyles />
    <StyledApp>
      <H1>Hello world</H1>
      <Button onClick={() => alert("Hiiiiiiiiii")}>Check In</Button>
      <Button onClick={() => alert("Byeeeeeeeee")}>Check Out</Button>

      <Input type="number" placeholder="Number of guests" />
    </StyledApp>
    </>
  )
}

export default App
