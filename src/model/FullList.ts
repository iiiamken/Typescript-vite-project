import ListItem from "./ListItem"

interface List {
  list: ListItem[]
  load(): void
  save(): void
  cleaList(): void
  addItem(itemObj: ListItem): void
  removeItem(id: string): void
}

export default class FullList implements List {
  static instance: FullList = new FullList() //new trick if we know we only going to have one list

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
   * Saves the list to the local storage by converting it to a JSON string and storing it under the key "list".
   *
   * @return {void} This function does not return anything.
   */
  save(): void {
    localStorage.setItem("list", JSON.stringify(this._list))
  }

  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id)
    this.save()
  }
}
