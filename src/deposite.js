import {Button } from "react-bootstrap"
import deps from './deposit.jpg'
import { useState , useEffect} from 'react'
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


export default function Deposit(){


const [dep,setDep]=useState(0)
const [usersId,setUserId]=useState();
const [data,setData]=useState([]);
const [passwords,setPassword]=useState([])




    useEffect(()=>{
    const fetchdata=async()=>{
        await axios.get('https://bank-server-rc04.onrender.com/data').then((item)=>{setData(item.data)})
    };fetchdata()
    },[]);

    function handleClick(e) {
        e.preventDefault();
        const user = data.find(item => item.userid === Number(usersId) && item.password === passwords);
        if (user) {
            const updatedAmount = Number(user.amount) + Number(dep);
            axios.put(`https://bank-server-rc04.onrender.com/update/${user._id}`, { amount: updatedAmount })
                .then(() => {
               alert(`Rs.${dep} Amount Credited to Your Account`);
                });
            } else {
           alert("User not found with the provided ID.");
            }

        }
    return(<>
    <title>Bad Bank | Deposit</title>

    <div className='depImg'>
        <img src={deps} alt=""/>
    </div>
    

    <div className='containers'>
        <h1 className='depositH'>Deposit</h1>
        <Form noValidate    className='card-outer-cash' onSubmit={handleClick} id="form">
        <Row className="mb-3">
            <Form.Group as={Col} md="13" controlId="validationCustom01">
            <Form.Label>User Id</Form.Label>
            <Form.Control
                required
                type="number"
                placeholder="Enter your user id"
                onChange={(e)=>setUserId(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group> 
            </Row>

        <Row className="mb-3">
            <Form.Group as={Col} md="13" controlId="validationCustom01">
            <Form.Label>Password</Form.Label>
            <Form.Control
                required
                type="password"
                placeholder="Enter your Password"
                onChange={(e)=>setPassword(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group> 
            </Row>
        <Row className="mb-3">

            <Form.Group as={Col} md="13" controlId="validationCustom02">
            <Form.Label>Enter your Amount</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="Enter your amount"
                onChange={(e)=>setDep(e.target.value)} 

            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
        </Row>
        <Button type="submit"   className='btn'>Enter</Button>
        </Form>
    </div>
    </>)
}
