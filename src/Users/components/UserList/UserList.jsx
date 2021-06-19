
import { useEffect } from 'react'
import { useUserContext } from '../../user.context'

export default function UserList() {
    const { users, getUsers } = useUserContext()

    useEffect(() => {
        getUsers()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            {users.map(item =>
                <div key={item.id}>
                    {JSON.stringify(item)}
                </div>
            )}
        </div>
    )
}