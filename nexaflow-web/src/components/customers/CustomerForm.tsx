
import { useEffect, useState, type FormEvent } from 'react'
import type { Customer, CustomerInput } from '../../types/customer'

interface CustomerFormProps {
  editingCustomer: Customer | null
  saving: boolean
  onSubmit: (data: CustomerInput) => Promise<boolean>
  onCancel: () => void
}

function CustomerForm({
  editingCustomer,
  saving,
  onSubmit,
  onCancel,
}: CustomerFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setName(editingCustomer?.name ?? '')
    setEmail(editingCustomer?.email ?? '')
    setPhone(editingCustomer?.phone ?? '')
    setError('')
  }, [editingCustomer])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim()) {
      setError('Name and email are required.')
      return
    }

    const success = await onSubmit({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    })

    if (success) {
      if (!editingCustomer) {
        setName('')
        setEmail('')
        setPhone('')
      }
    } else {
      setError('Failed to save customer. Please try again.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-xl bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-xl font-semibold text-slate-900">
        {editingCustomer ? 'Edit Customer' : 'Add Customer'}
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <input
          className="rounded-lg border border-slate-300 p-3 text-slate-900 focus:border-indigo-500 focus:outline-none"
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={100}
        />

        <input
          className="rounded-lg border border-slate-300 p-3 text-slate-900 focus:border-indigo-500 focus:outline-none"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          maxLength={255}
        />

        <input
          className="rounded-lg border border-slate-300 p-3 text-slate-900 focus:border-indigo-500 focus:outline-none"
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          maxLength={30}
        />
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="mt-4 flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {saving
            ? 'Saving...'
            : editingCustomer
              ? 'Save Changes'
              : 'Add Customer'}
        </button>

        {editingCustomer && (
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="rounded-lg bg-slate-200 px-5 py-3 text-slate-700 hover:bg-slate-300 disabled:opacity-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default CustomerForm