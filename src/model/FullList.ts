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

  get list(): ListItem[] {
    return this._list
  }
}
