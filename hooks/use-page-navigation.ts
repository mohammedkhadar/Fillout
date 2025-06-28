"use client"

import { useReducer } from "react"
import type { Page } from "../types/page"
import type { PageAction, PageState } from "../types/page-actions"

function pageReducer(state: PageState, action: PageAction): PageState {
  switch (action.type) {
    case "ADD_PAGE": {
      const { afterIndex } = action.payload
      const { pages, copyPage } = state 
      
      const id = pages.length + 1
      let newPage = null
      if (copyPage) {
        const copy = pages.find(page => page.id === copyPage)
        newPage = {
          id,
          name: `${copy.name} [Copy]`
        }
      } else {
        newPage = {
          id,
          name: `Page ${id}`
        }
      }

      const newPages = [...state.pages]
      newPages.splice(afterIndex + 1, 0, newPage)
      
      return {
        ...state,
        pages: newPages,
        copyPage: ''
      }
    }

    case "DELETE_PAGE": {
      const { pageId } = action.payload

      // Don't delete if it's the last page
      if (state.pages.length <= 1) return state

      const pageIndex = state.pages.findIndex((p) => p.id === pageId)
      if (pageIndex === -1) return state

      const remainingPages = state.pages.filter((p) => p.id !== pageId)

      // If the deleted page was active, choose a new active page
      let newActivePage = state.activePage
      if (pageId === state.activePage) {
        const newIndex = Math.min(pageIndex, remainingPages.length - 1)
        newActivePage = remainingPages[newIndex].id
      }

      return {
        pages: remainingPages,
        activePage: newActivePage,
      }
    }

    case "RENAME_PAGE": {
      const { pageId, newName } = action.payload
      const trimmedName = newName.trim()

      if (!trimmedName) return state

      return {
        ...state,
        pages: state.pages.map((page) => (page.id === pageId ? { ...page, name: trimmedName } : page)),
      }
    }

    case "DUPLICATE_PAGE": {
      const { pageId } = action.payload
      const pageIndex = state.pages.findIndex((p) => p.id === pageId)

      if (pageIndex === -1) return state

      const originalPage = state.pages[pageIndex]
      const newPage: Page = {
        id: Date.now().toString(),
        name: `${originalPage.name} Copy`,
      }

      const newPages = [...state.pages]
      newPages.splice(pageIndex + 1, 0, newPage)

      return {
        ...state,
        pages: newPages,
      }
    }

    case "SET_AS_FIRST_PAGE": {
      const { pageId } = action.payload
      const pageIndex = state.pages.findIndex((p) => p.id === pageId)

      if (pageIndex === -1 || pageIndex === 0) return state

      const newPages = [...state.pages]
      const [pageToMove] = newPages.splice(pageIndex, 1)
      newPages.unshift(pageToMove)

      return {
        ...state,
        pages: newPages,
      }
    }

    case "SET_ACTIVE_PAGE": {
      const { pageId } = action.payload
      return {
        ...state,
        activePage: pageId,
      }
    }

    case "SET_PAGES": {
      const { pages } = action.payload
      return {
        ...state,
        pages,
      }
    }

    case "SET_COPY_PAGE": {
      const { pageId } = action.payload
      return {
        ...state,
        copyPage: pageId
      }
    }

    default:
      return state
  }
}

export function usePageNavigation(initialPages: Page[], initialActivePage: string) {
  const [state, dispatch] = useReducer(pageReducer, {
    pages: initialPages,
    activePage: initialActivePage,
    copiedPage: null
  })

  // Action creators
  const addPage = (afterIndex: number) => {
    dispatch({ type: "ADD_PAGE", payload: { afterIndex } })
  }

  const deletePage = (pageId: string) => {
    dispatch({ type: "DELETE_PAGE", payload: { pageId } })
  }

  const renamePage = (pageId: string, newName: string) => {
    dispatch({ type: "RENAME_PAGE", payload: { pageId, newName } })
  }

  const duplicatePage = (pageId: string) => {
    dispatch({ type: "DUPLICATE_PAGE", payload: { pageId } })
  }

  const setAsFirstPage = (pageId: string) => {
    dispatch({ type: "SET_AS_FIRST_PAGE", payload: { pageId } })
  }

  const setActivePage = (pageId: string) => {
    dispatch({ type: "SET_ACTIVE_PAGE", payload: { pageId } })
  }

  const setPages = (pages: Page[]) => {
    dispatch({ type: "SET_PAGES", payload: { pages } })
  }

  const setCopyPage = (pageId: string) => {
    dispatch({ type: "SET_COPY_PAGE", payload: { pageId } })
  }

  return {
    pages: state.pages,
    activePage: state.activePage,
    addPage,
    deletePage,
    renamePage,
    duplicatePage,
    setAsFirstPage,
    setActivePage,
    setPages,
    setCopyPage,
    dispatch, // Expose dispatch for advanced use cases
  }
}
