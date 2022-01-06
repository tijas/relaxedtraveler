import React, { useState, useEffect } from "react";
import Destination from "../components/Destination";
import Weather from "../components/Weather";
import "../components/Plan.css"
import { Col, Container, Row, Modal, Button } from 'react-bootstrap';
import { CgAddR } from 'react-icons/cg'
import { RiDeleteBinLine, RiCalendarTodoLine } from 'react-icons/ri'

function NoteChange(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="note-color">
      <Modal.Title id="contained-modal-title-vcenter" className="note-color">
        <input id="modal-header" placeholder="Title" type="text" className="text-primary" value={props.modifiedNote[2]} onChange={(e) => props.setModifiedNote([props.modifiedNote[0], props.modifiedNote[1], e.target.value, props.modifiedNote[3]])}>
        </input>
      </Modal.Title>
      </Modal.Header>
      <Modal.Body className="note-color pt-0">
        <textarea id="modal-input" placeholder="Note body" className="text-primary" value={props.modifiedNote[3]} onChange={(e) => props.setModifiedNote([props.modifiedNote[0], props.modifiedNote[1], props.modifiedNote[2] , e.target.value])}>
        </textarea>
      </Modal.Body>
      <Modal.Footer className="d-flex flex-row justify-content-between note-color border-top border-primary border-2">
        <Button onClick={props.onHide}>Close</Button>
        <RiDeleteBinLine onClick={props.deleteNote} className="text-primary bin-icon"/>
        <Button onClick={props.saveNote}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

function MainNoteChange(props) {
  const [lines, setLines] = useState()

  useEffect(()=>{
    const array = [...props.modifiedMainNote[2]]
    setLines(array)

  },[props.modifiedMainNote])

  function lineChanger(index, value) {
    const newLines = [...lines]
    newLines.splice(index,1,value)
    setLines(newLines)
  }

  function saveDay() {
    const newLines = [...lines]
    props.saveDayNote(newLines)
  }

  function deleteLine(index) {
    const newLines = [...lines]
    newLines.splice(index,1,)
    setLines(newLines)
  }

  const addLine = () => {
    const newLines = [...lines]
    newLines.push("New Line")
    setLines(newLines)
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="note-color" >
        <Modal.Title id="contained-modal-title-vcenter" className="text-primary">
          <p>{props.modifiedMainNote[1]}</p>
        </Modal.Title>
        <p className="text-primary" onClick={addLine}>Add line <RiCalendarTodoLine/></p>
      </Modal.Header>
      <Modal.Body className="note-color pt-0">
      {lines?lines.map((line, index) =>
        <p><input placeholder="Note body" key={index} className="text-primary line-input m-1" value={line} onChange={(e) => lineChanger(index, e.target.value)}>
        </input><RiDeleteBinLine className="text-primary" onClick={()=>deleteLine(index)}/></p>
        ):""
      }
      </Modal.Body>
      <Modal.Footer className="d-flex flex-row justify-content-between note-color border-top border-primary border-2">
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={saveDay}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Plan = ({city, setCity, date, setDate, days, setDays}) => {

  const [modalShow, setModalShow] = useState(false);
  const [modalDayShow, setModalDayShow] = useState(false);
  const datum = new Date(date).getTime()  

  const [modifiedNote, setModifiedNote] = useState(["","","",""]) 
  const [modifiedMainNote, setModifiedMainNote] = useState(["","",[]]) 

  

  function mainNoteChanger(dayId, dayDate, lineArray){ 
    setModifiedMainNote([dayId, dayDate, lineArray])
    setModalDayShow(true)
  }

  function noteChanger(dayId, noteId, header, text) {
    setModifiedNote([dayId, noteId, header, text])
    setModalShow(true)
  }

  const saveDayNote = (newLines) =>{
    let updatedDay = [...days[modifiedMainNote[0]]];
    updatedDay.splice(1,1,newLines);
    let updatedDays = [...days];
    updatedDays[modifiedMainNote[0]] = updatedDay;
    setDays(updatedDays);
    setModalDayShow(false)
  }

  const saveNote = () =>{
    if(modifiedNote[3]!==""){
    let updatedDay = [...days[modifiedNote[0]]];
    updatedDay.splice(modifiedNote[1],1,[modifiedNote[2],modifiedNote[3]]);
    let updatedDays = [...days];
    updatedDays[modifiedNote[0]] = updatedDay;
    setDays(updatedDays);
    }
    setModalShow(false)
  }

  const deleteNote = () =>{
    let updatedDay = [...days[modifiedNote[0]]];
    updatedDay.splice(modifiedNote[1],1);
    let updatedDays = [...days];
    updatedDays[modifiedNote[0]] = updatedDay;
    setDays(updatedDays);
    setModalShow(false)
  }

  const addDay = () =>{
    setDays([...days, [days.length,["New day, New me"]]]);
    setModalShow(false)
  }
  const deleteDay = () =>{
    setDays(days.slice(0,days.length-1));
    setModalShow(false)
  }

  return (
    <div id="plan" className="text-primary">
      <NoteChange
        show={modalShow}
        onHide={() => setModalShow(false)}
        modifiedNote={modifiedNote}
        setModifiedNote={setModifiedNote}
        saveNote={saveNote}
        deleteNote={deleteNote}
      />
      <MainNoteChange
        show={modalDayShow}
        onHide={() => setModalDayShow(false)}
        modifiedMainNote={modifiedMainNote}
        setModifiedMainNote={setModifiedMainNote}
        saveDayNote={saveDayNote}
      />

      <Container fluid className="selections">
        
        <Row className="set align-self-center">
        <Col sm={9} className="align-self-center">
          <div>
          <Destination
            city={city}
            setCity={setCity}
            date={date}
            setDate={setDate}
          />
          </div>
          <div className="text-center mt-2 mb-0">
            {city.name!==""?<h4 className="mb-0">Destination: {city.name}{city.state?`, ${city.state}`:""}{city.country?`, ${city.country}`:""}</h4>:<h4 className="mb-0">Select city</h4>}
          </div>
        </Col>
        <Col sm={3} className="p-1">
          <Weather city={city} date={date}/>
        </Col>
        </Row>
      </Container>
      <Container fluid className="p-2">
        {days.map( (x, index) =>
          <Row key={index+"dayrow"} className="day border-top border-primary border-2">

            <Col sm={9} className="d-flex flex-row flex-wrap">
              {x.map((z, index, array) => index!==0&&index!==1?
              <div key={index} className="note text-center m-1 p-1" onClick={() => noteChanger(array[0], index, z[0], z[1])}>
                <h5 key={index+"h"}>{z[0]}</h5>
                <p key={index+"p"}>{z[1]}</p>
              </div>:"")}
              <div className="align-self-center px-3 py-2 m-1 note-adder" onClick={() => noteChanger(index, x.length, "", "")}>
              <CgAddR className="new-note-icon"/>
              <p className="text-center m-0">New note</p>
              </div>
            </Col>

            <Col sm={3} className="border-start border-primary border-2 main-task">
              <div key={index} className="main-note text-center mt-1" onClick={() => mainNoteChanger(x[0], new Date(datum+(86400000*index)).toLocaleDateString(), x[1])}>
                {date?<h5 key={index+"p"} className="mb-1">{new Date(datum+(86400000*index)).toLocaleDateString()}</h5>:<h5>Select date</h5>}
                {x[1].map((line, index)=> <p key={index+"line"} className="mb-1">{line}</p>)}
              </div>
            </Col>
          </Row>
        )}
          <Row className="d-flex justify-content-between mt-1">
            <Col className="d-flex justify-content-center text-center"><div className="parent-pop d-flex flex-column align-items-center" onClick={deleteDay}><RiDeleteBinLine className="text-primary bin-icon"/><p className="pop-in m-0 p-0">Delete Day</p></div></Col>
            <Col className="d-flex justify-content-center text-center"><div className="parent-pop d-flex flex-column align-items-center" onClick={addDay}><RiCalendarTodoLine className="text-primary bin-icon"/><p className="pop-in m-0 p-0">Add New Day</p></div></Col>
          </Row>      
      </Container>
    </div>
  )
}

export default Plan;