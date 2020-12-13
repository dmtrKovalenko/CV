describe("dmtrkovalenko.dev", () => {
  it("opens landing page", () => {
    cy.visit("/")
    cy.percySnapshot()
  })

  it("opens video talk card", () => {
    cy.visit("/")
    cy.contains("Stop using console for component testing").click()
    cy.wait(1000)
    cy.percySnapshot()
  })

  it("opens for-hrs page", () => {
    cy.visit("/forHrs")
  })

  it("opens resume html page", () => {
    cy.visit("/resume")
    cy.percySnapshot()
  })
})