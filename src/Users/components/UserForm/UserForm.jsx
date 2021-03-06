import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { isValidAge, isValidEmail, isValidLinkedinURL, isValidUser } from '../../../helpers/validators';
import LoadingIconGif from '../../../assets/imgs/loadingIcon.gif'
import styled from 'styled-components';
import { mainGradient } from '../mainGradient';
import { useDispatch, useSelector } from 'react-redux';
import { saveUsers } from '../../../redux/users/actions';

const FormWrapper = styled.div`
    margin:2rem;
    background-color: #d2d5ff;
    background-image: ${mainGradient};
    border-radius:1rem;
    padding:1rem;
    color:white;
`;

const CustomTextField = (props) => {

    return <TextField {...props} variant='outlined' fullWidth margin='normal' />
}
const LoadingIcon = () => {
    return <img alt='LoadingIcon' src={LoadingIconGif} width='20px' height='20px' />
}

export default function UserForm() {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [linkedinProfile, setLinkedinProfile] = useState('')
    const [checkError, setCheckError] = useState(false)


    const dispatch = useDispatch()
    const loading = useSelector((state) => state.users.loadingOnSave)

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

        const user = { name, lastName, age, email, linkedinProfile }

        if (isValidUser(user)) {

            dispatch(saveUsers({ user }))
            resetForm()
            return


        }

        setCheckError(true)

        setTimeout(() => { setCheckError(false) }, 3000)


    }

    return (
        <FormWrapper>
            <CustomTextField
                value={name}
                onChange={e => setName(e.target.value)}
                error={checkError && (!name || name.length < 3)}
                helperText={checkError && (!name || name.length < 3) && (name.length < 3 ? 'Name is too short' : 'Name is mandatory')}
                label='Name' />

            <CustomTextField
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                error={checkError && (!lastName || lastName.length < 3)}
                helperText={checkError && (!lastName || lastName.length < 3) && (lastName.length < 3 ? 'Last Name is too short' : 'Last Name is mandatory')}
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
                    disabled={loading}
                    startIcon={loading && <LoadingIcon />}
                >Submit </Button>
            </div>


        </FormWrapper>
    )
}
