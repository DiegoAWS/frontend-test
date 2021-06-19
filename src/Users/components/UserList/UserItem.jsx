

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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
    return (
        <StyledCard >
            <NameContainer > {user.name + ' ' + user.lastName}  </NameContainer>

            <div style={{ display: 'flex' ,alignItems:'center',marginTop:'2rem'}}>
                <div style={{ width: '20%',margin:'10px' }}>
                    <img alt="" src={avatarImage} style={{ width: '100%' }} />
                </div>

                <div>
                    <Typography variant="body2" color="textSecondary" component="p" >
                        {'Age: ' + user.age}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <a
                            href={'mailto:' + user.email}
                            title={user.email}> {user.email}</a>
                    </Typography>


                    <Typography variant="body2" color="textSecondary" component="p">
                        <a
                            href={user.linkedinProfile}
                            title={user.linkedinProfile}
                            target="_blank"
                            rel="noreferrer"
                        >Linkedin Profile</a>
                    </Typography>
                </div>

            </div>
            <CardContent>

            </CardContent>

            <CardActions>
                <Button size="small" color="primary" variant="outlined" >
                    Edit
                </Button>
                <Button size="small" color="secondary" variant="outlined" >
                    Remove
                </Button>
            </CardActions>
        </StyledCard >
    )
}
