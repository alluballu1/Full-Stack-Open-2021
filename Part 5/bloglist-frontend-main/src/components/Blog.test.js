import Blog from "./Blog"
import NewBlogPost from "./NewBlogPost"
import "@testing-library/jest-dom/extend-expect"
import { fireEvent, render } from "@testing-library/react"

const blog = {
    author: "Alex",
    title: "testing",
    urL: "myurl",
    likes: 0,
    user: { name: "minä" }
}
const currentUser = {
    username:"minä"
}

test("renders content", () => {

    const component = render(
        <Blog currentBlog={blog}/>
    )
    expect(component.container).toHaveTextContent(
        "Alex", "testing"
    )
})
test("renders content after pressing the button", () => {
    const component = render(
        <Blog userData={currentUser} currentBlog={blog}/>
    )
    const button = component.getByText("view")
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
        "Alex", "testing", "myurl", 0, "minä")


})

test("Button pressed twice", () => {
    const mockhandler = jest.fn()
    const component = render(
        <Blog userData={currentUser} currentBlog={blog} likeFunct={mockhandler}/>
    )
    const button = component.getByText("view")
    fireEvent.click(button)

    const likeButton = component.getByText("like")
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockhandler.mock.calls).toHaveLength(2)
})

test("The output of the values is correct when creating a new blogpost", () => {
    const mockhandler = jest.fn()
    const component = render(
        <NewBlogPost newBlog={mockhandler} />
    )
    const button = component.getByText("add new blog")
    fireEvent.click(button)
    const form = component.container.querySelector("form")
    const title = component.container.querySelector("#title")
    const author = component.container.querySelector("#author")
    const url = component.container.querySelector("#url")


    fireEvent.change(title, {
        target: { value: "Uusi title" }
    })

    fireEvent.change(author, {
        target: { value:"Alex Porri" }
    })

    fireEvent.change(url, {
        target: { value:"myUrl" }
    })

    fireEvent.submit(form)

    const result = mockhandler.mock.calls
    expect(result[0][0].title).toBe("Uusi title")
    expect(result[0][0].author).toBe("Alex Porri")
    expect(result[0][0].url).toBe("myUrl")
    expect(result).toHaveLength(1)


})