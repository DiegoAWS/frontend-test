
import { useEffect } from 'react'
import { useUserContext } from '../../user.context'
import UserItem from './UserItem'

export default function UserList() {
    const { users, getUsers } = useUserContext()

    useEffect(() => {
        getUsers()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div style={{padding:'0 2rem'}}>
            {users.map(item =>
                <div key={item.id}>
                    <div style={{ margin: '2rem 0' }}>
                        <UserItem user={item} />
                    </div>
                </div>
            )}
        </div>
    )
}