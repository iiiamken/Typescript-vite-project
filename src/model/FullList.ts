import ListItem from "./ListItem"

interface List {
  list: ListItem[]
  load(): void
  save(): void
  clearList(): void
  addItem(itemObj: ListItem): void
  removeItem(id: string): void
}

export default class FullList implements List {
  static instance: FullList = new FullList() //trick if we know we only going to have one list

  constructor(private _list: ListItem[] = []) {}

  /**
   * Returns the list of ListItems.
   *
   * @return {ListItem[]} The list of ListItems.
   */
  get list(): ListItem[] {
    return this._list
  }

  /**
   * Loads the list from the local storage and adds each item to the FullList instance.
   *
   * @return {void} This function does not return anything.
   */
  load(): void {
    const storedList: string | null = localStorage.getItem("myList")
    if (typeof storedList !== "string") return
    //created similar type to ListItem but with underscores
    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedList)

    parsedList.forEach((itemObj) => {
      const newListItem = new ListItem(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      )
      FullList.instance.addItem(newListItem)
    })
  }

  /**
   * Saves the list to the local storage by converting it to a JSON string and storing it under the key "list".
   *
   * @return {void} This function does not return anything.
   */
  save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list))
  }

  /**
   * Removes an item from the list based on its ID and updates the local storage.
   *
   * @param {string} id - The ID of the item to be removed.
   * @return {void} This function does not return anything.
   */
  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id)
    this.save() //updates our local storage
  }

  /**
   * Adds a new item to the list and saves the changes to the local storage.
   *
   * @param {ListItem} itemObj - The item object to be added to the list.
   * @return {void} This function does not return anything.
   */
  addItem(itemObj: ListItem): void {
    this._list.push(itemObj)
    this.save()
  }

  /**
   * Clears the list and saves the changes to the local storage.
   *
   * @return {void} This function does not return anything.
   */
  clearList(): void {
    this._list = []
    this.save()
  }
}
