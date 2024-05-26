import "../css/style.css"

import FullList from "./FullList"
import ListItem from "./ListItem"
import ListTemplate from "../templates/ListTemplate"

const initApp = (): void => {
  const fullList = FullList.instance
  const template = ListTemplate.instance

  const itemEntryForm = document.getElementById(
    "itemEntryForm"
  ) as HTMLFormElement
  //added event listener to itemEntryForm
  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault

    const input = document.getElementById("newItem") as HTMLInputElement
    const newEntryText: string = input.value.trim()

    if (!newEntryText.length) return

    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length + 1].id + 1)
      : 1

    const newItem = new ListItem(itemId.toString(), newEntryText)
    //add item to list
    fullList.addItem(newItem)
    //re-render the list
    template.render(fullList)
  })

  //clear button
  const clearItems = document.getElementById(
    "clearItemsButton"
  ) as HTMLButtonElement
  //event listener for clear button
  clearItems.addEventListener("click", (): void => {
    fullList.clearList()
    template.clear()
  })
  //init load the list
  fullList.load()
  //init render the list
  template.render(fullList)
}

document.addEventListener("DOMContentLoaded", initApp)
