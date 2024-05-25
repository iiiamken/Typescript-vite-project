import FullList from "../model/FullList"

interface DOMList {
  ul: HTMLUListElement
  clear(): void
  render(fullList: FullList): void
}

export default class ListTemplate implements DOMList {
  ul: HTMLUListElement
  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement
  }

  clear(): void {
    this.ul.innerHTML = ""
  }

  render(fullList: FullList): void {
    //clear the list
    this.clear()

    //for each item in the list
    fullList.list.map((item) => {
      //create a new list item
      const li = document.createElement("li") as HTMLLIElement

      //add a class to the list item
      li.className = "item"

      //create a checkbox
      const check = document.createElement("input") as HTMLInputElement
      check.type = "checkbox"
      check.id = item.id
      check.tabIndex = 0
      check.checked = item.checked
      li.append(check)

      //create a eventlistener for the checkbox
      check.addEventListener("change", () => {
        item.checked = !item.checked
        fullList.save()

        //create a label to add to each list item
        const label = document.createElement("label") as HTMLLabelElement
        label.htmlFor = item.id
        label.textContent = item.item
        li.append(label)

        //create a button to remove each list item
        const button = document.createElement("button") as HTMLButtonElement
        button.className = "button"
        button.textContent = "X"
        button.addEventListener("click", () => {
          fullList.removeItem(item.id)
        })
        li.append(button)

        button.addEventListener("click", () => {
          fullList.removeItem(item.id)
          this.render(fullList)
        })
        // adds the list item to the list
        this.ul.append(li)
      })
    })
  }
}
