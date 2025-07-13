"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

import { Team, teamsData } from "@/static/teamsData"

// ----------------------
// Dashboard Context
// ----------------------

type DashboardContextType = {
  teams: Team
  setTeams: Dispatch<SetStateAction<Team>>
}

const DashboardContext = createContext<DashboardContextType>({
  teams: teamsData[0],
  setTeams: () => {},
})

export const useDashboard = () => useContext(DashboardContext)

// ----------------------
// Dialog Context
// ----------------------

type DialogContentType = {
  title?: string
  description?: string
  content: ReactNode
  actions?: ReactNode
}

type DialogContextType = {
  openDialog: (content: DialogContentType) => void
  closeDialog: () => void
}

const DialogContext = createContext<DialogContextType>({
  openDialog: () => {},
  closeDialog: () => {},
})

export const useDialog = () => useContext(DialogContext)

// ----------------------
// Unified Provider
// ----------------------

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [teams, setTeams] = useState<Team>(teamsData[0])

  const [dialogContent, setDialogContent] = useState<DialogContentType | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openDialog = useCallback((content: DialogContentType) => {
    setDialogContent(content)
    setIsDialogOpen(true)
  }, [])

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false)
    setDialogContent(null)
  }, [])

  return (
    <DashboardContext.Provider value={{ teams, setTeams }}>
      <DialogContext.Provider value={{ openDialog, closeDialog }}>
        {children}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              {dialogContent?.title && <DialogTitle>{dialogContent.title}</DialogTitle>}
              {dialogContent?.description && (
                <DialogDescription>{dialogContent.description}</DialogDescription>
              )}
            </DialogHeader>

            <div className="py-2">{dialogContent?.content}</div>

            {dialogContent?.actions && <DialogFooter>{dialogContent.actions}</DialogFooter>}
          </DialogContent>
        </Dialog>
      </DialogContext.Provider>
    </DashboardContext.Provider>
  )
}
