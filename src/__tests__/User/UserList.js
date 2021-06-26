import { customRender } from "../../setupTests";
import UserList from "../../Users/components/UserList/UserList";
import { mockUser } from "../../assets/mockUser";

describe("Testing UserList", () => {
  it("Testing on users :[]", () => {
    customRender(<UserList />, {
      initialState: {
        users: {
          users: [],
        },
      },
    });
    expect(
      document.getElementById("listWrapper").childElementCount === 0
    ).toBeTruthy();
  });


  it("Testing on users :[mockUser]", () => {
    const mockList = [
      { id: "test_id", created_at: Date.now().toString(), ...mockUser },
    ];
    customRender(<UserList />, {
      initialState: {
        users: {
          users: mockList,
        },
      },
    });
    
    expect(
        document.getElementById("listWrapper").childElementCount === 1
      ).toBeTruthy();

   });
});
