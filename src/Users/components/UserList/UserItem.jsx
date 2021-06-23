import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import avatarImage from '../../../assets/imgs/avatarImage.png'


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
export default function UserItem({ user }) {

    const created_at=new Date(parseInt( user.create_at)).toJSON().slice(0,10)
 
    return (
        <StyledCard >
            <CardContent>
                <NameContainer > {user.name + ' ' + user.lastName}  </NameContainer>

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
                                {'Created at: '+created_at}
                            </Typography>

                        </div>
                    </div>

                </div>


            </CardContent>
        </StyledCard >
    )
}
