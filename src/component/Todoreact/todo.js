import React, { useState, useEffect } from 'react'
import "./style.css"


const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  if (lists) {
    return JSON.parse(lists)
  } else {
    return []
  }
}

const Todo = () => {
  const [inputdata, setInputData] = useState("")
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItems] = useState("")
  const [toggleButton, setToggleButton] = useState(false)


  const addItem = () => {
    if (inputdata === '') {
      alert("plz fill the data")
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((currElem) => {
          if (currElem.id === isEditItem) {
            return { ...currElem, name: inputdata }
          }
          return currElem;
        })
      );
      setInputData("")
      setIsEditItems(null);
      setToggleButton(false)

    }
    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      }
      setItems([...items, myNewInputData])
      setInputData("");
    }
  }


  const editItems = (index) => {
    const item_todo_edited = items.find((currElem) => {
      return currElem.id === index;
    })

    setInputData(item_todo_edited.name)
    setIsEditItems(index);
    setToggleButton(true)
  }


  const deleteItem = (index) => {
    const updatedItem = items.filter((currElem) => {
      return currElem.id !== index
    })
    setItems(updatedItem)
  }


  const removeAll = () => {
    setItems([]);
  }


  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));

  }, [items]);


  return (
    <>
    <div className="container">
      
    </div>
      <div className='main-div'>
        <div className='child-div'>
          <figure>
            <img src="./image/icon.jpg" alt='todolog' />
            <figcaption>Add Your Lst Here ✌️</figcaption>
          </figure>


          <div className='addItem'>
            <input type="text"
              placeholder="✍️ Add Item"
              className='form-control'
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i className=" fa fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className=" fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>


          <div className='showItem'>
            {items.map((currElem) => {
              return (
                <div className='eachItem' key={currElem.id}>
                  <h3>{currElem.name}</h3>
                  <div className='todo-btn'>
                    <i className=" far  fa-edit add-btn"
                      onClick={() => editItems(currElem.id)}
                    ></i>
                    <i className=" far  fa-trash-alt  add-btn"
                      onClick={() => deleteItem(currElem.id)}></i>
                  </div>
                </div>
              );
            })}

          </div>


          <div className='showItems'>
            <button className='btn effect04' data-sm-link-text="Remove All"
              onClick={removeAll}>
              <span>
                CHECK LIST
              </span>
            </button>
            <figure>
            <figcaption className='head'>❤️Create By Manas❤️</figcaption>
            </figure>
          </div>

        </div>
      </div>

    </>
  )
}

export default Todo


