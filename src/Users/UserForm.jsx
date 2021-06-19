import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createUser } from './user.service';

const CustomTextField = (props) => {

    return <TextField {...props} variant="outlined" fullWidth margin="normal" />
}


export default function UserForm() {
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState()
    const [age, setAge] = useState("")
    const [email, setEmail] = useState("")
    const [linkedinProfile, setLinkedinProfile] = useState("")

    const onKeyAgeDown = (e) => {
        const allowedKeys=["Backspace","Enter","ArrowRight","ArrowLeft"] ;
        
        if(allowedKeys.includes(e.code))
            return// Avoid validation

        if ( /\D/.test(e.key))// if is not a digit
            e.preventDefault();
    }

    const submitHandler = async () => {
        const newUser = { name, lastName, age, email, linkedinProfile }
        console.log({ newUser })
        const data = await createUser(newUser)
        console.log(data)
    }

    return (
        <div>
            <CustomTextField
                value={name}
                onChange={e => setName(e.target.value)}
                label="Name" />

            <CustomTextField
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                label="Last Name" />

            <CustomTextField
                value={age}
                onChange={e => setAge(e.target.value)}
                onKeyDown={onKeyAgeDown}
                label="Age" />


            <CustomTextField
                value={email}
                onChange={e => setEmail(e.target.value)}
                label="Email" />

            <CustomTextField
                value={linkedinProfile}
                onChange={e => setLinkedinProfile(e.target.value)}
                label="Age" />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="primary" onClick={submitHandler}>Submit </Button>
            </div>


        </div>
    )
}
