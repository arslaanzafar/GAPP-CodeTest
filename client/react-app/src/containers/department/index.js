import axios from "axios"
import React, { useState, useEffect } from "react";

import { Table, Container, Button, Modal, Form } from 'react-bootstrap'

const Departments = () => {

    const [data, setData] = useState([]);

    const [users, setUsers] = useState([]);

    const [teams, setTeams] = useState([]);

    const [itemToAdd, setItemToAdd] = useState({
        name: "",
        inCharge: "",
        teams: []
    });

    const [itemToEdit, setItemToEdit] = useState({
        name: "",
        inCharge: "",
        teams: []
    });

    const [addShow, setAddShow] = useState(false);

    const handleAddClose = () => {
         setAddShow(false);
         setItemToAdd({
            name: "",
            inCharge: "",
            teams: []
        })
    }
    const handleAddShow = () => setAddShow(true);

    const [editShow, setEditShow] = useState(false);

    const handleEditClose = () => {
        setEditShow(false)
        setItemToEdit({
            name: "",
            inCharge: "",
            teams: []
        })
    }

    const handleEditShow = () => {
        setEditShow(true);
    }

    const handleAdd = async (e) => {
        e.preventDefault()
        await axios.post(
            'departments/', itemToAdd
        ).then((result) => {
            setData([...data, result.data])
            handleAddClose()
        });
    }

    const handleDelete = async (e, item) => {
        e.preventDefault()
        await axios.delete(
            `departments/${item?._id}`
        ).then((result) => {
            setData(data.filter(function (obj) {
                return obj._id !== item?._id;
            }))
        });
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        await axios.put(
            `departments/${itemToEdit?._id}`, itemToEdit
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

        setItemToAdd({ name: itemToAdd.name, inCharge: itemToAdd.inCharge, teams: [...itemToAdd.teams, user._id] })
    }

    const addToTeam_Edit = async (e, user) => {
        e.preventDefault()

        setItemToEdit({ _id: itemToEdit._id, name: itemToEdit.name, inCharge: itemToEdit.inCharge, teams: [...itemToEdit.teams, user._id] })
    }

    const removeFromTeam_Edit = async (e, user) => {
        e.preventDefault()
        
        setItemToEdit({
            _id: itemToEdit._id,
            inCharge: itemToEdit.inCharge, name: itemToEdit.name, teams: itemToEdit.teams?.filter(function (obj) {
                return obj !== user?._id;
            })
        })
    }

    useEffect(() => {
        async function fetchData() {
            const result = await axios(
                'departments/',
            );
            setData(result.data.results)
        }
        fetchData()
    }, []);

    useEffect(() => {
        async function fetchData() {
            const result = await axios(
                'teams/',
            );
            setTeams(result.data.results)
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
                            <th>Name</th>
                            <th>In Charge</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data ?

                            data?.map((item, i) => {
                                return (

                                    <tr key={i}>
                                        <td>{item?._id}</td>
                                        <td>{item?.name}</td>
                                        <td>{item?.inCharge?.name}</td>
                                        <td>
                                            <Button variant="primary" size="sm"
                                                onClick={(e) => {
                                                    setItemToEdit({ _id: item._id, name: item?.name, teams: item?.teams?.map((i) => { return i._id }), inCharge: item?.inCharge._id })
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
                            Add Department
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
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Select InCharge : </Form.Label>
                                <select
                                    value={itemToAdd.inCharge}
                                    onChange={(e) => setItemToAdd({ ...itemToAdd, inCharge: e.target.value })}
                                    name="select" id="select">
                                    <option value="0">Please select</option>

                                    {users?.map((cat, index) => (
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    ))}
                                </select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Teams</Form.Label>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Team Lead</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {teams ?

                                            teams?.map((item, i) => {
                                                return (

                                                    <tr key={i}>
                                                        <td>{item?._id}</td>
                                                        <td>{item?.teamLead?.name}</td>
                                                        <td>
                                                            {itemToAdd?.teams?.some(e => e === item._id)

                                                                ?
                                                                <Button variant="primary" size="sm"
                                                                    disabled
                                                                >
                                                                    Add to Department
                                                                </Button>

                                                                :

                                                                <Button variant="primary" size="sm"
                                                                    onClick={(e) => { addToTeam(e, item) }}
                                                                >
                                                                    Add to Department
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
                            Edit Department
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
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Select In Charge : </Form.Label>
                            <select
                                value={itemToEdit.inCharge}
                                onChange={(e) => setItemToEdit({ ...itemToEdit, inCharge: e.target.value })}
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
                                    {teams ?

                                        teams?.map((item, i) => {
                                            return (

                                                <tr key={i}>
                                                    <td>{item?._id}</td>
                                                    <td>{item?.teamLead?.name}</td>
                                                    <td>

                                                        {itemToEdit?.teams?.some(e => e === item?._id)

                                                            ?
                                                            <Button variant="danger" size="sm"
                                                                onClick={(e) => { removeFromTeam_Edit(e, item) }}
                                                            >
                                                                Remove from Department
                                                            </Button>

                                                            :

                                                            <Button variant="primary" size="sm"
                                                                onClick={(e) => { addToTeam_Edit(e, item) }}
                                                            >
                                                                Add to Department
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

export default Departments