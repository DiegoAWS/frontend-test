import { screen } from "@testing-library/react";
import { customRender } from "../../setupTests";
import UserItem from "../../Users/components/UserList/UserItem";
import { mockUser } from "../../assets/mockUser";

describe("Testing <UserItem/>", () => {
  it("Testing Show Data Properly", () => {
    const mockedUser = {
      id: "test_id",
      created_at: Date.now().toString(),
      ...mockUser,
    };
    customRender(<UserItem user={mockedUser} />);

    const mockUserElements = ["John Doe", /25/, "john.doe@gmail.com"];
    mockUserElements.forEach((labelText) => {
      screen.getAllByText(labelText).forEach((item) => {
        expect(item).toBeInTheDocument();
      });
    });
  });
});
