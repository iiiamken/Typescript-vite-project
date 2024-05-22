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

  load(): void {
    const storedList: string | null = localStorage.getItem("list")
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
    localStorage.setItem("list", JSON.stringify(this._list))
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

  addItem(itemObj: ListItem): void {
    this._list.push(itemObj)
    this.save()
  }

  clearList(): void {
    this._list = []
    this.save()
  }
}
