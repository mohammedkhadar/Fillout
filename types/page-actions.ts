import type { Page } from "./page"

export type PageAction =
  | { type: "ADD_PAGE"; payload: { afterIndex: number; page: Page } }
  | { type: "DELETE_PAGE"; payload: { pageId: string } }
  | { type: "RENAME_PAGE"; payload: { pageId: string; newName: string } }
  | { type: "DUPLICATE_PAGE"; payload: { pageId: string } }
  | { type: "SET_AS_FIRST_PAGE"; payload: { pageId: string } }
  | { type: "SET_ACTIVE_PAGE"; payload: { pageId: string } }
  | { type: "SET_PAGES"; payload: { pages: Page[] } }

export interface PageState {
  pages: Page[]
  activePage: string
}
