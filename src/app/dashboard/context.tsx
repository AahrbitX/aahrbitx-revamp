"use client"

import { Team, teamsData } from "@/static/teamsData"
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react"

type DashboardContextType = {
  teams: Team
  setTeams: Dispatch<SetStateAction<Team>>
}

const DashboardContext = createContext<DashboardContextType>({
  teams: teamsData[0],
  setTeams: () => {}
})

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [teams, setTeams] = useState<Team>(teamsData[0])

  return (
    <DashboardContext.Provider value={{ teams, setTeams }}>
      {children}
    </DashboardContext.Provider>
  )
}

export const useDashboard = () => useContext(DashboardContext)
