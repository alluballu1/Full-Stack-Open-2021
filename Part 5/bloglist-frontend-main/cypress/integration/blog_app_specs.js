cy.onUncaughtException = function () { }

describe("Note ", function () {
    beforeEach(function() {
        cy.request("POST", "http://localhost:3003/api/testing/reset")
        cy.request("POST", "http://localhost:3003/api/users", {
            username: "alluballu", name: "minä", password: "allualluallu"
        })
        cy.visit("http://localhost:3000")
    })
    it("login form is shown", function () {
        cy.contains("log in to application")
    })
    it("Successful login", function () {
        cy.contains("log in to application")
        cy.get("input:first").type("alluballu")
        cy.get("input:last").type("allualluallu")
        cy.contains("login").click()
        cy.contains("minä is logged in")
    })
    it("Failed login", function () {
        cy.get("input:first").type("fake")
        cy.get("input:last").type("credentials")
        cy.contains("login").click()
        cy.contains("wrong username or password")

    })
    it("blogs can be posted, liked, are automatically sorted and can be deletd.", function() {
        cy.contains("log in to application")
        cy.get("input:first").type("alluballu")
        cy.get("input:last").type("allualluallu")
        cy.contains("login").click()
        cy.get("#newblog").click()
        cy.get("#title").type("My New Blog")
        cy.get("#author").type("Alex Porri")
        cy.get("#url").type("myurl")
        cy.get("#submitnew").click()
        cy.contains("a new blog My New Blog by Alex Porri added")
        cy.get(".toggleVisibility").click()
        cy.get(".likeButton").click()
        cy.get("#newblog").click()
        cy.get("#title").type("My New Blog 2")
        cy.get("#author").type("Alex Porri")
        cy.get("#url").type("myurl")
        cy.get("#submitnew").click()
        cy.get(".toggleVisibility").click()
        cy.get(".likeButton").eq(1).click()
        cy.get(".likeButton").eq(1).click()
        cy.get(".bloginfo").eq(0).contains("My New Blog 2 Alex Porri")
        cy.get(".deletionButton").eq(0).click()
        cy.get(".bloginfo").eq(0).contains("My New Blog Alex Porri")
    })




})