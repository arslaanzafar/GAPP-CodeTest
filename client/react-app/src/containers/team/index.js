import axios from "axios"
import React, { useState, useEffect } from "react";

import { Table, Container, Button, Modal, Form } from 'react-bootstrap'

const Teams = () => {

    const [data, setData] = useState([]);

    const [users, setUsers] = useState([]);

    const [itemToAdd, setItemToAdd] = useState({
        teamLead: "",
        people: []
    });

    const [itemToEdit, setItemToEdit] = useState({
        teamLead: "",
        people: []
    });

    const [addShow, setAddShow] = useState(false);

    const handleAddClose = () => setAddShow(false);
    const handleAddShow = () => setAddShow(true);

    const [editShow, setEditShow] = useState(false);

    const handleEditClose = () => {
        setEditShow(false)
        setItemToAdd({
            teamLead: "",
            people: []
        })
    }

    const handleEditShow = () => setEditShow(true);

    const handleAdd = async (e) => {
        e.preventDefault()
        await axios.post(
            'teams/', itemToAdd
        ).then((result) => {
            setData([...data, result.data])
            handleAddClose()
        });
    }

    const handleDelete = async (e, item) => {
        e.preventDefault()
        await axios.delete(
            `teams/${item?._id}`
        ).then((result) => {
            setData(data.filter(function (obj) {
                return obj._id !== item?._id;
            }))
        });
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        await axios.put(
            `teams/${itemToEdit?._id}`, itemToEdit
        ).then((result) => {

            const index = data.findIndex((item => item._id === itemToEdit?._id))

                setData([
                    ...data.slice(0, index),
                    result.data,
                    ...data.slice(index + 1)
                ])
                
            handleEditClose()
        });
    }

    const addToTeam = async (e, user) => {
        e.preventDefault()

        setItemToAdd({ teamLead: itemToAdd.teamLead, people: [...itemToAdd.people, user._id] })
    }

    const addToTeam_Edit = async (e, user) => {
        e.preventDefault()

        setItemToEdit({ _id: itemToEdit._id, teamLead: itemToEdit.teamLead, people: [...itemToEdit.people, user._id] })
    }

    const removeFromTeam_Edit = async (e, user) => {
        e.preventDefault()
        
        setItemToEdit({
            _id: itemToEdit._id,
            teamLead: itemToEdit.teamLead, people: itemToEdit.people?.filter(function (obj) {
                return obj !== user?._id;
            })
        })
    }

    useEffect(() => {
        async function fetchData() {
            const result = await axios(
                'teams/',
            );
            setData(result.data.results)
        }
        fetchData()
    }, []);

    useEffect(() => {
        async function fetchData() {
            const result = await axios(
                'users/',
            );
            setUsers(result.data.results)
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
                            <th>Team Lead</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data ?

                            data?.map((item, i) => {
                                return (

                                    <tr key={i}>
                                        <td>{item?._id}</td>
                                        <td>{item?.teamLead.name}</td>
                                        <td>
                                            <Button variant="primary" size="sm"
                                                onClick={(e) => {
                                                    setItemToEdit({ _id: item._id, people: item?.people?.map((i) => { return i._id }), teamLead: item?.teamLead._id })
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
                            Add Team
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Select Team Lead : </Form.Label>
                                <select
                                    value={itemToAdd.teamLead}
                                    onChange={(e) => setItemToAdd({ ...itemToAdd, teamLead: e.target.value })}
                                    name="select" id="select">
                                    <option value="0">Please select</option>

                                    {users?.map((cat, index) => (
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    ))}
                                </select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Team Members</Form.Label>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users ?

                                            users?.map((item, i) => {
                                                return (

                                                    <tr key={i}>
                                                        <td>{item?._id}</td>
                                                        <td>{item?.name}</td>
                                                        <td>
                                                            {itemToAdd?.people?.some(e => e === item._id)

                                                                ?
                                                                <Button variant="primary" size="sm"
                                                                    disabled
                                                                >
                                                                    Add to Team
                                                                </Button>

                                                                :

                                                                <Button variant="primary" size="sm"
                                                                    onClick={(e) => { addToTeam(e, item) }}
                                                                >
                                                                    Add to Team
                                                                </Button>
                                                            }

                                                        </td>
                                                    </tr>)
                                            })
                                            :
                                            <></>
                                        }
                                    </tbody>
                                </Table>
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
                            <Form.Label>Select Team Lead : </Form.Label>
                            <select
                                value={itemToEdit.teamLead}
                                onChange={(e) => setItemToEdit({ ...itemToEdit, teamLead: e.target.value })}
                                name="select" id="select">
                                <option value="0">Please select</option>

                                {users?.map((cat, index) => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Team Members</Form.Label>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users ?

                                        users?.map((item, i) => {
                                            return (

                                                <tr key={i}>
                                                    <td>{item?._id}</td>
                                                    <td>{item?.name}</td>
                                                    <td>

                                                        {itemToEdit?.people?.some(e => e === item?._id)

                                                            ?
                                                            <Button variant="danger" size="sm"
                                                                onClick={(e) => { removeFromTeam_Edit(e, item) }}
                                                            >
                                                                Remove from Team
                                                            </Button>

                                                            :

                                                            <Button variant="primary" size="sm"
                                                                onClick={(e) => { addToTeam_Edit(e, item) }}
                                                            >
                                                                Add to Team
                                                            </Button>
                                                        }

                                                    </td>
                                                </tr>)
                                        })
                                        :
                                        <></>
                                    }
                                </tbody>
                            </Table>
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

export default Teams