
const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  users.forEach(user => { 
    const isVisible = user.Name.toLowerCase().includes(value) || user.Score.toLowerCase().includes(value) || user.Score.toLowerCase().includes("score")
    user.element.classList.toggle("hide", !isVisible)

  })
})


fetch("https://eformvinhhao.github.io/game_uc_che/ketqua.json")
  .then(res => res.json())
  .then(data => {
    users = data.map(user => {
      const card = userCardTemplate.content.cloneNode(true).children[0]
      const No = card.querySelector("[data-No]")
      const Name = card.querySelector("[data-Name]")
      const Mail = card.querySelector("[data-Mail]")
      const Dept = card.querySelector("[data-Dept]")
      const Correct = card.querySelector("[data-Correct]")
      const Time = card.querySelector("[data-Time]")
      const Score = card.querySelector("[data-Score]")
      const Timestamp = card.querySelector("[data-Timestamp]")
      No.textContent = user.No
      Name.textContent = user.Name
      Mail.textContent = user.Mail
      Dept.textContent = user.Dept
      Correct.textContent = user.Correct
      Time.textContent = user.Time
      Score.textContent = user.Score
      Timestamp.textContent = user.Timestamp
      userCardContainer.append(card)
      console.log(user.Name)
      return { 
        No: user.No,
        Name: user.Name,  
        Mail: user.Mail,
        Dept: user.Dept,
        Correct: user.Correct,
        Time: user.Time,
        Score: user.Score,
        Timestamp: user.Timestamp,
        element: card
      }
    })
  })
