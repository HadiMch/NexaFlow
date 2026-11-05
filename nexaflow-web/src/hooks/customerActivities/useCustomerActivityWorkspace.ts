
import { useState } from 'react'
import { useCustomerActivities } from './useCustomerActivities'
import { useToast } from '../useToast'
import type { Customer } from '../../types/customer'
import type {
  CustomerActivity,
  UpdateCustomerActivityInput,
} from '../../types/customerActivity'

type DiscardIntent = 'close' | 'cancel-edit' | 'switch-edit' | null

export function useCustomerActivityWorkspace(
  customer: Customer,
  onClose: () => void
) {
  const data = useCustomerActivities(customer.id)
  const { showToast } = useToast()

  const [editingActivity, setEditingActivity] =
    useState<CustomerActivity | null>(null)

  const [formDirty, setFormDirty] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [discardIntent, setDiscardIntent] =
    useState<DiscardIntent>(null)
  const [pendingEdit, setPendingEdit] =
    useState<CustomerActivity | null>(null)

  const [deleting, setDeleting] = useState(false)

  const busy =
    data.saving ||
    data.deletingId !== null ||
    deleting

  async function handleSubmit(
    input: UpdateCustomerActivityInput
  ): Promise<boolean> {
    try {
      const editing = editingActivity !== null

      const success = editingActivity
        ? await data.updateActivity(editingActivity.id, input)
        : await data.addActivity({
            ...input,
            customerId: customer.id,
          })

      if (success) {
        setFormDirty(false)
        setEditingActivity(null)

        showToast(
          editing
            ? 'Customer activity updated.'
            : 'Customer activity recorded.',
          'success'
        )
      } else {
        showToast('Failed to save activity.', 'error')
      }

      return success
    } catch {
      showToast('Unable to save activity.', 'error')
      return false
    }
  }

  function requestClose() {
    if (busy) return

    if (formDirty) {
      setDiscardIntent('close')
    } else {
      onClose()
    }
  }

  function cancelEditing() {
    if (busy) return

    if (formDirty) {
      setDiscardIntent('cancel-edit')
    } else {
      setEditingActivity(null)
    }
  }

  function requestEdit(activity: CustomerActivity) {
    if (busy) return

    if (formDirty) {
      setPendingEdit(activity)
      setDiscardIntent('switch-edit')
      return
    }

    setEditingActivity(activity)
    setFormDirty(false)
  }

  function confirmDiscard() {
    const intent = discardIntent

    setDiscardIntent(null)
    setFormDirty(false)

    if (intent === 'close') {
      onClose()
    } else if (intent === 'cancel-edit') {
      setEditingActivity(null)
    } else if (intent === 'switch-edit') {
      setEditingActivity(pendingEdit)
    }

    setPendingEdit(null)
  }

  function cancelDiscard() {
    setDiscardIntent(null)
    setPendingEdit(null)
  }

  async function confirmDelete() {
    if (deleteId === null || busy) return

    const id = deleteId
    setDeleting(true)

    try {
      const success = await data.deleteActivity(id)

      if (success) {
        if (editingActivity?.id === id) {
          setEditingActivity(null)
          setFormDirty(false)
        }

        showToast('Activity deleted successfully.', 'success')
      } else {
        showToast('Failed to delete activity.', 'error')
      }
    } catch {
      showToast('Failed to delete activity.', 'error')
    } finally {
      setDeleteId(null)
      setDeleting(false)
    }
  }

  return {
    ...data,
    editingActivity,
    formDirty,
    setFormDirty,
    deleteId,
    discardIntent,
    deleting,
    busy,
    handleSubmit,
    requestClose,
    cancelEditing,
    requestEdit,
    confirmDiscard,
    cancelDiscard,
    requestDelete: setDeleteId,
    cancelDelete: () => setDeleteId(null),
    confirmDelete,
  }
}
