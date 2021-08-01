import axios from "axios"
import React, { useState, useEffect } from "react";

import { Table, Container, Button, Modal, Form } from 'react-bootstrap'

const Users = () => {

    const [data, setData] = useState([]);

    const [itemToAdd, setItemToAdd] = useState({
        name: "",
    });

    const [itemToEdit, setItemToEdit] = useState({
        name: "",
    });

    const [addShow, setAddShow] = useState(false);

    const handleAddClose = () => setAddShow(false);
    const handleAddShow = () => setAddShow(true);

    const [editShow, setEditShow] = useState(false);

    const handleEditClose = () => setEditShow(false);
    const handleEditShow = () => setEditShow(true);

    const handleAdd = async (e) => {
        e.preventDefault()
        await axios.post(
            'users/', itemToAdd
        ).then((result) => {
            setData([...data, result.data])
            handleAddClose()
        });
    }

    const handleDelete = async (e, item) => {
        e.preventDefault()
        await axios.delete(
            `users/${item?._id}`
        ).then((result) => {
            setData(data.filter(function (obj) {
                return obj._id !== item?._id;
            }))
        });
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        await axios.put(
            `users/${itemToEdit?._id}`, itemToEdit
        ).then((result) => {

            const index = data.findIndex((item => item._id === itemToEdit?._id))
            if(index){
                setData([
                    ...data.slice(0, index),
                    {
                        _id: itemToEdit?._id,
                        name: itemToEdit?.name,
                    },
                    ...data.slice(index + 1)
                ]
                );
            }
            
            handleEditClose()
        });
    }


    useEffect(() => {
        async function fetchData() {
            const result = await axios(
                'users/',
            );
            setData(result.data.results)
        }
        fetchData()
    }, []);


    return (
        <>
            <Container>

                <Button variant="primary" size="sm" onClick={handleAddShow}>
                    Add
                </Button>{' '}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data ?

                            data.map((item, i) => {
                                return (

                                    <tr key={i}>
                                        <td>{item?._id}</td>
                                        <td>{item?.name}</td>
                                        <td>
                                            <Button variant="primary" size="sm"
                                                onClick={(e) => {
                                                    setItemToEdit(item)
                                                    handleEditShow()
                                                }}
                                            >
                                                Edit Details
                                            </Button>{' '}
                                            <Button variant="danger" size="sm"
                                                onClick={(e) => { handleDelete(e, item) }}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>)
                            })
                            :
                            <></>
                        }
                    </tbody>
                </Table>


                <Modal
                    show={addShow} onHide={handleAddClose}
                    onSubmit={handleAdd}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add User
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name"

                                    onChange={(e) => setItemToAdd({ ...itemToAdd, name: e.target.value })}

                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={handleAdd}>
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>



                <Modal
                    show={editShow} onHide={handleEditClose}
                    onSubmit={handleEdit}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit User
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name"
                                    value={itemToEdit?.name}
                                    onChange={(e) => setItemToEdit({ ...itemToEdit, name: e.target.value })}

                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={handleEdit}>
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>


            </Container>
        </>
    )
}

export default Users