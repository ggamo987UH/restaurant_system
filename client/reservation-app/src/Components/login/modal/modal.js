import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./modal.css";
import Options from "./options";
import { useEffect, useState } from "react";
import Axios from "axios";

const ModalOptions = (props) => {
  const [show, setShow] = React.useState(props.show);


  const handleClose = () => {
    props.setIsBookingClicked(false);
    setShow(false);

    const nameLocal = localStorage.getItem("name");
    const phoneLocal = localStorage.getItem("phone");
    const emailLocal = localStorage.getItem("email");
    const partyLocal = localStorage.getItem("partySize");
    const timeLocal = localStorage.getItem("partyTime");
    const dateLocal = localStorage.getItem("partyDate");
    const creditLocal = localStorage.getItem("creditCard");

    //let's send this to the database

    Axios.post("http://localhost:3001/insertBookings", {
      name: nameLocal,
      phone: phoneLocal,
      email: emailLocal,
      credit: creditLocal,
      partySize: partyLocal,
      partyTime: timeLocal,
      partyDate: dateLocal,
    }).then((result) => {
      alert(result.data.message);
    }
    );





  };
  const handleShow = () => setShow(true);
  
 

  return (
    <>
      {/*<Button variant="primary" onClick={handleShow}>
            submit
        </Button>*/}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you a new user ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Options />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
       
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalOptions;
