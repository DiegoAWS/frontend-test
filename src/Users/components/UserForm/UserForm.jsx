import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { isValidAge, isValidEmail, isValidLinkedinURL, isValidUser } from '../../../helpers/validators';
import { useUserContext } from '../../user.context';
import LoadingIconGif from '../../../assets/imgs/loadingIcon.gif'
import styled from 'styled-components';

const FormWrapper=styled.div`
    margin:2rem;
    background-color: #f6f0c4;
    background-image: linear-gradient(315deg, #f6f0c4 0%, #d99ec9 74%);
    border-radius:1rem;
    padding:1rem;
    color:white;
`;

const CustomTextField = (props) => {

    return <TextField {...props} variant='outlined' fullWidth margin='normal' />
}
const LoadingIcon = () => {
    return <img alt='' src={LoadingIconGif} width='20px' height='20px' />
}

export default function UserForm() {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [linkedinProfile, setLinkedinProfile] = useState('')
    const [checkError, setCheckError] = useState(false)

    const { loading, createUser } = useUserContext()

    const resetForm = () => {
        setName('')
        setLastName('')
        setAge('')
        setEmail('')
        setLinkedinProfile('')
    }

    const onKeyAgeDown = (e) => {
        const allowedKeys = ['Backspace', 'Enter', 'Delete', 'ArrowRight', 'ArrowLeft', 'Tab'];

        if (allowedKeys.includes(e.code))
            return// Avoid validation on Non-Input KEYS

        if (/\D/.test(e.key))// if is not a digit
            e.preventDefault();
    }

    const submitHandler = async () => {

        const newUser = { name, lastName, age, email, linkedinProfile }
        if (isValidUser(newUser)) {
            try {
                createUser(newUser)
                resetForm()
                return
            } catch (error) {
                console.error({ error })
            }

        }

        setCheckError(true)

        setTimeout(() => { setCheckError(false) }, 3000)


    }

    return (
        <FormWrapper>
            <CustomTextField
                value={name}
                onChange={e => setName(e.target.value)}
                error={checkError && !name}
                helperText={checkError && !name && 'Name is mandatory'}
                label='Name' />

            <CustomTextField
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                error={checkError && !lastName}
                helperText={checkError && !lastName && 'Last Name is mandatory'}
                label='Last Name' />

            <CustomTextField
                value={age}
                onChange={e => setAge(e.target.value)}
                onKeyDown={onKeyAgeDown}
                error={checkError && !isValidAge(age)}
                helperText={checkError && !isValidAge(age) && 'Age should be between 16 and 120'}
                label='Age' />


            <CustomTextField
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={checkError && !isValidEmail(email)}
                helperText={checkError && !isValidEmail(email) && 'Not a valid Email'}
                label='Email' />

            <CustomTextField
                value={linkedinProfile}
                onChange={e => setLinkedinProfile(e.target.value)}
                error={checkError && !isValidLinkedinURL(linkedinProfile)}
                helperText={checkError && !isValidLinkedinURL(linkedinProfile) && 'Not a valid Linkedin Profile'}
                label='Linkedin Profile' />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={submitHandler}
                    // disabled={loading}
                    startIcon={loading && <LoadingIcon />}
                >Submit </Button>
            </div>


        </FormWrapper>
    )
}
