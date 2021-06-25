import Grid from '@material-ui/core/Grid'
import { UserForm, UserList } from '../components'


export default function UserPage() {
    return (
            <Grid container spacing={3} style={{width:'100%'}}>
                <Grid item sm={6} xs={12} >
                    <UserForm />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <UserList />
                </Grid>
            </Grid>
    )
}
