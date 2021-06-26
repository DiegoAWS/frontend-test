import { screen } from "@testing-library/react";
import { customRender } from "../../setupTests";
import UserForm from "../../Users/components/UserForm/UserForm";

describe("User Form Test Display properly", () => {
  it("Form Is rendered Property", () => {
    customRender(<UserForm />);

    // Testing if Labels are in the document
    const labels = [
      "Name",
      "Last Name",
      "Age",
      "Email",
      "Linkedin Profile",
      "Submit",
    ];
    labels.forEach((labelText) => {
      screen.getAllByText(labelText).forEach((item) => {
        expect(item).toBeInTheDocument();
      });
    });
  });
  it("LoadingOnSave:false Not Show <LoadingIcon/>", () => {
    customRender(<UserForm />, {
      initialState: {
        users: {
          loadingOnSave: false,
        },
      },
    });
    expect(screen.queryByAltText('LoadingIcon')).toBeNull()
  });
  
  it("LoadingOnSave:true  Show <LoadingIcon/>", () => {
    customRender(<UserForm />, {
      initialState: {
        users: {
          loadingOnSave: true,
        },
      },
    });
    expect(screen.queryByAltText('LoadingIcon')).toBeInTheDocument()
  });
});

