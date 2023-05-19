import { render, fireEvent, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SelectBox from "./SelectBox";

const mockStore = configureStore([]);

describe("SelectBox component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
  store = mockStore({
      quiz: {
        category: { id: 9, name: "General Knowledge" },
        difficulty: "easy",
      },
    });
  });

  it("renders SelectBox component", () => {
    render(
      <Provider store={store}>
        <SelectBox
          width={200}
          inputLabel="Category"
          list={[
            "General Knowledge",
            "Entertainment: Books",
            "Entertainment: Film",
          ]}
          type="category"
        />
      </Provider>
    );
    const label = screen.getByLabelText("Category");

    expect(label).toBeInTheDocument();
  });

  it("changes selected item on click", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <SelectBox
          width={200}
          inputLabel="Category"
          list={[
            "General Knowledge",
            "Entertainment: Books",
            "Entertainment: Film",
          ]}
          type="category"
        />
      </Provider>
    );

    const selectbox = getByRole("button");
    expect(selectbox.innerHTML).toBe("General Knowledge");

    fireEvent.mouseDown(selectbox);
    const listbox = within(getByRole("listbox"));
    fireEvent.click(listbox.getByText(/Entertainment: Books/i));

    expect(selectbox.innerHTML).toBe("Entertainment: Books");
  });

  it("works with difficulties as well", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <SelectBox
          width={200}
          inputLabel="Difficulty"
          list={["Easy", "Medium", "Hard"]}
          type="difficulty"
        />
      </Provider>
    );

    const selectbox = getByRole("button");
    expect(selectbox.innerHTML).toBe("Easy");

    fireEvent.mouseDown(selectbox);
    const listbox = within(getByRole("listbox"));
    fireEvent.click(listbox.getByText(/Hard/i));

    expect(selectbox.innerHTML).toBe("Hard");
  });
});
