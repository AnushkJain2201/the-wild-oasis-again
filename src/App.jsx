import styled from "styled-components"
import GlobalStyles from "../styles/GlobalStyles"

import Button from "../ui/Button"
import Input from "../ui/Input"
import Heading from "../ui/Heading"

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`

function App() {

  return (
    <>
    <GlobalStyles />
    <StyledApp>
      <Heading as='h1'>The Wild Oasis</Heading>
      <Heading as='h2'>Check In / Check Out</Heading>
      <Heading as='h3'>Forms</Heading>
      <Button onClick={() => alert("Hiiiiiiiiii")}>Check In</Button>
      <Button onClick={() => alert("Byeeeeeeeee")}>Check Out</Button>

      <Input type="number" placeholder="Number of guests" />
    </StyledApp>
    </>
  )
}

export default App
