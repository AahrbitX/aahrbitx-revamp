'use client'

import React, { useState } from 'react'
import { useAuth } from '@/providers/auth-provider'
import { createOrganisation } from '@/lib/api'

function NewOrganisationCreationPage() {
  const { user: AppUser } = useAuth()
  const [orgName, setOrgName] = useState('')
  const [domain, setDomain] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleCreateOrg = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const res = await await createOrganisation({
        name: orgName,
        domain,
        plan: "Basic",
        user_id: AppUser?.id ?? '',
        email: AppUser?.email ?? '',
        user_name: AppUser?.email ?? ''
      });
      
      const data = await res.json()
      if (data.status === 'success') {
        setMessage('Organisation created successfully!')
        setOrgName('')
        setDomain('')
      } else {
        setMessage('Failed to create organisation.')
      }
    } catch {
      setMessage('Network error.')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-slate-800 rounded-lg shadow">
      <h2 className="text-xl font-bold text-white mb-4">Create New Organisation</h2>
      <form onSubmit={handleCreateOrg} className="space-y-4">
        <div>
          <label className="block text-slate-300 mb-1">Organisation Name</label>
          <input
            type="text"
            value={orgName}
            onChange={e => setOrgName(e.target.value)}
            className="w-full p-2 rounded bg-slate-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-slate-300 mb-1">Domain</label>
          <input
            type="text"
            value={domain}
            onChange={e => setDomain(e.target.value)}
            className="w-full p-2 rounded bg-slate-700 text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Organisation'}
        </button>
        {message && <div className="text-center text-slate-300 mt-2">{message}</div>}
      </form>
    </div>
  )
}

export default NewOrganisationCreationPage