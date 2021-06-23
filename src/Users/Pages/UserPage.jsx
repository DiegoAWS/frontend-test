import Grid from '@material-ui/core/Grid'
import { UserContextProvider } from '../user.context'
import { UserForm, UserList } from '../components'


export default function UserPage() {
    return (
        <UserContextProvider>
            <Grid container spacing={3} style={{width:'100%'}}>
                <Grid item sm={6} xs={12} >
                    <UserForm />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <UserList />
                </Grid>
            </Grid>
        </UserContextProvider>
    )
}
