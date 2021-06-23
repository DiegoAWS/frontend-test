
import { useEffect } from 'react'
import styled from 'styled-components'
import { useUserContext } from '../../user.context'
import UserItem from './UserItem'

const ListWrapper=styled.div`
    padding:0 2rem;
    @media (min-width: 600px) {
        max-height:calc(100vh - 2rem);
        overflow-y:auto;
    }
`;

export default function UserList() {
    const { users, getUsers ,} = useUserContext()

    useEffect(() => {
        getUsers()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ListWrapper>
            {users.map(item =>
                <div key={item.id}>
                    <div style={{ margin: '2rem 0' }}>
                        <UserItem user={item} />
                    </div>
                </div>
            )}
        </ListWrapper>
    )
}