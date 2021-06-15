import React, { useState } from "react";
import { FaCheck, FaPlus, FaTimes } from "react-icons/fa";
import {
  ModalContent,
  ItemContainer,
  ListContainer,
  Form,
  InputForm,
  ButtonItem,
  ModalConteiner,
  ButtonForm,
  DivButtons,
} from "./App.style";

const defaultList = [
  { task: "learn Redux", finished: false },
  { task: "learn Typescript", finished: false },
  { task: "learn React", finished: true },
];

function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState(defaultList);

  function toogleStatusItem(position: number, status: boolean) {
    const newArray = [...list];
    newArray[position].finished = status;
    setList(newArray);
  }

  function removeItem(position: number) {
    const newArray = [...list].filter((item, index) => index !== position);
    setList(newArray);
  }

  function addItem(event: any){
    event.preventDefault();
    const listItem = { task: item, finished: false };
    if (!!listItem) {
      setList((prevList) => ([...prevList, listItem]));
      setItem("");
    }
  }

  return (
    <ModalConteiner>
      <ModalContent>
        <Form
          onSubmit={(event) => addItem(event)}
        >
          <InputForm
            type="text"
            value={item}
            placeholder="Add a task here..."
            onChange={(event) => setItem(event.target.value)}
          />
          <ButtonForm type="submit">
            <FaPlus style={{ color: "white", fontSize: "24px" }} />
          </ButtonForm>
        </Form>
        <ListContainer
          style={{ borderBottom: "2px solid rgb(58, 123, 213, .2)" }}
        >
          {list.map((item, index) => {
            if (!item.finished) {
              return (
                <ItemContainer key={index}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontWeight: 600,
                      fontSize: "18px",
                    }}
                  >
                    {item.task}
                  </span>
                  <DivButtons>
                    <ButtonItem onClick={() => toogleStatusItem(index, true)}>
                      <FaCheck
                        style={{
                          background: "#d6e4fd",
                          padding: "5px",
                          borderRadius: "20px",
                        }}
                      />
                    </ButtonItem>
                    <ButtonItem onClick={() => removeItem(index)}>
                      <FaTimes
                        style={{
                          background: "#d6e4fd",
                          padding: "5px",
                          borderRadius: "20px",
                        }}
                      />
                    </ButtonItem>
                  </DivButtons>
                </ItemContainer>
              );
            }
            return null;
          })}
        </ListContainer>
        <ListContainer>
          {list.map((item, index) => {
            if (item.finished) {
              return (
                <ItemContainer
                  style={{
                    backgroundColor: "#3a7bd5",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "18px",
                    marginBottom: 0,
                  }}
                  key={index}
                >
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {item.task}
                  </span>
                  <ButtonItem onClick={() => toogleStatusItem(index, false)}>
                    <FaCheck
                      style={{
                        background: "white",
                        padding: "5px",
                        borderRadius: "20px",
                      }}
                    />
                  </ButtonItem>
                </ItemContainer>
              );
            }
            return null;
          })}
        </ListContainer>
      </ModalContent>
    </ModalConteiner>
  );
}

export default App;
