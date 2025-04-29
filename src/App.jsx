import styled from "styled-components"

const H1 = styled.h1`
  font-size: 30px;
  color: red;
  font-weight: 600;
  background-color: yellow;
`

const BUTTON = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border-radius: 7px;
  background-color: purple;
  color: white;
  cursor: pointer;
  margin: 20px;
`

const INPUT = styled.input`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
  font-size: 1.4rem;
`

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`

function App() {

  return (
    <StyledApp>
      <H1>Hello world</H1>
      <BUTTON onClick={() => alert("Hiiiiiiiiii")}>Check In</BUTTON>
      <BUTTON onClick={() => alert("Byeeeeeeeee")}>Check Out</BUTTON>

      <INPUT type="number" placeholder="Number of guests" />
    </StyledApp>
  )
}

export default App
