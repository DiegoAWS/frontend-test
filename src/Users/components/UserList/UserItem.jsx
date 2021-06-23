import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import avatarImage from '../../../assets/imgs/avatarImage.png'
import { useUserContext } from '../../user.context';


const StyledCard = styled.div`
    background-color: #f6f0c4;
    background-image: linear-gradient(315deg, #f6f0c4 0%, #d99ec9 74%);
    border-radius:10px;
    transition: .3s;
    border: 1px solid transparent;
    :hover{
        border-color:#8282828c;
        box-shadow: 1px 1px 17px 1px rgb(0 0 0 / 16%);
    }
`

const NameContainer = styled.div`
    background-color: #6b6b6b36;
    padding:10px;
    text-align:center;
    border-radius:10px;
    color:white;
`
const DeleteIcon = (props) => (
    <SvgIcon viewBox='0 0 16 16' {...props}>
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
    </SvgIcon>
);


const HeaderCard = styled.div`
    display:flex;
    align-items:center;
    margin-right:-1rem;
    >:first-child{
        flex:1;
    }`;


export default function UserItem({ user }) {

    const { removeUser } = useUserContext()
    const deleteHandler = () => {
        removeUser(user.id)
    }
    const created_at = new Date(parseInt(user.created_at)).toJSON().slice(0, 10)

    return (
        <StyledCard >
            <CardContent>
                <HeaderCard>
                    <NameContainer > {user.name + ' ' + user.lastName}  </NameContainer>
                    <IconButton
                        color="secondary"
                        aria-label="delete icon"
                        onClick={deleteHandler}
                        disabled={user.id === "temporary_id"}
                    >
                        <DeleteIcon />
                    </IconButton>
                </HeaderCard>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '20%', margin: '1rem 2rem 0 0' }}>
                        <img alt='' src={avatarImage} style={{ width: '100%' }} />
                    </div>

                    <div>
                        <Typography variant='body2' color='textSecondary' component='div' >
                            {'Age: ' + user.age}
                        </Typography>
                        <Typography variant='body2' color='textSecondary' component='span'>
                            <Typography variant='body2' color='textSecondary' component='span' >
                                {'Email: '}
                                <a
                                    href={'mailto:' + user.email}
                                    title={user.email}> {user.email}</a>
                            </Typography>

                        </Typography>


                        <div >
                            <Typography variant='body2' color='textSecondary' component='span' >
                                {'Linkedin: '}
                                <a
                                    href={user.linkedinProfile}
                                    title={user.linkedinProfile}
                                    target='_blank'
                                    rel='noreferrer'
                                >Linkedin Profile</a>
                            </Typography>

                        </div>

                        <div >
                            <Typography variant='body2' color='textSecondary' component='span' >
                                {'Created at: ' + created_at}
                            </Typography>

                        </div>
                    </div>

                </div>


            </CardContent>
        </StyledCard >
    )
}
