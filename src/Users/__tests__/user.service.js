import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BACKEND_URL, deleteUser, listAllUser, storeUser } from '../user.service';

const mockUser = {
    name: 'John',
    lastName: 'Doe',
    age: 25,
    email: 'john.doe@gmail.com',
    linkedinProfile: 'https://cl.linkedin.com/company/john-doe',
  };
const server = setupServer(
  rest.get(BACKEND_URL+'/users', (req, res, ctx) => {
    return res(ctx.json([mockUser]));
  }),

  rest.post(BACKEND_URL+'/users', (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),
  rest.delete(BACKEND_URL+'/users/:id', (req, res, ctx) => {
    return res(ctx.json(req.params.id));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('testing user service', () => {
  it('testing listAllUser()', async () => {
        expect(await listAllUser()).toStrictEqual([mockUser])
  });
  it('testing storeUser',async ()=>{
    expect(await storeUser(mockUser)).toStrictEqual(mockUser);
  })
  it('testing deleteUser',async ()=>{
      expect(await deleteUser('test_id')).toBe('test_id')
  })
});
