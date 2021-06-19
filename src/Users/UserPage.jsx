import UserForm from './UserForm'
import UserList from './UserList'

export default function UserPage() {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
                <UserForm />
            </div>
            <div style={{ width: '50%' }}>
                <UserList />
            </div>
        </div>
    )
}
