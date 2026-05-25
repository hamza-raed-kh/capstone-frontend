import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addToast } from "../../../features/toast/toastSlice"
import { useCreateEventMutation, useUpdateEventMutation, useDeleteEventMutation } from "../../../features/api/eventApi"
import { useCreateEditRequestMutation } from "../../../features/api/editRequestApi"
import { useGetTopicsQuery } from "../../../features/api/topicApi"
import { useGetEventTypesQuery } from "../../../features/api/eventApi"
import { Button } from "../../inputs/Button/Button"
import TextInput from "../../inputs/TextInput/TextInput"
import TextArea from "../../inputs/TextArea/TextArea"
import FileInput from "../../inputs/FileInput/FileInput"
import NumberInput from "../../inputs/NumberInput/NumberInput"
import SelectInput from "../../inputs/SelectInput/SelectInput"
import DateInput from "../../inputs/DateInput/DateInput"
import Icon from '../../ui/Icon/Icon'
import CheckboxInput, { CheckboxGroup } from "../../inputs/CheckboxInput/CheckboxInput"
import styles from './CompetitionForm.module.css'

const publicityOptions = [
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
]

function CompetitionForm({ initialData, isEdit }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation()
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation()
  const [deleteEvent] = useDeleteEventMutation()
  const [createEditRequest, { isLoading: isRequesting }] = useCreateEditRequestMutation()
  const { data: topicsData } = useGetTopicsQuery()
  const topics = topicsData?.results || []
  const { data: eventTypesData } = useGetEventTypesQuery()
  const typeOptions = (eventTypesData?.results || []).map(t => ({ value: String(t.id), label: t.name }))

  const isLive = isEdit && initialData?.status === "open"

  const [title, setTitle] = useState(initialData?.title || "")
  const [type, setType] = useState(String(initialData?.event_type ?? ""))
  const [publicity, setPublicity] = useState(initialData?.visibility || "public")
  const [reward, setReward] = useState(initialData?.reward || "")
  const [location, setLocation] = useState(initialData?.location || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [startDate, setStartDate] = useState(initialData?.start_date || "")
  const [endDate, setEndDate] = useState(initialData?.end_date || "")
  const [maxParticipants, setMaxParticipants] = useState(initialData?.capacity || 0)
  const [teamMin, setTeamMin] = useState(initialData?.team_size_min || 1)
  const [teamMax, setTeamMax] = useState(initialData?.team_size_max || 1)
  const [tags, setTags] = useState(initialData?.topics || [])
  const [bannerFile, setBannerFile] = useState(null)

  const toDateString = (d) => {
    if (!d) return undefined
    if (d instanceof Date && !isNaN(d)) return d.toISOString().split("T")[0]
    if (typeof d === "string") return d.split("T")[0]
    return undefined
  }

  const buildPayload = (status) => ({
    title,
    visibility: publicity,
    reward,
    location,
    description,
    start_date: toDateString(startDate),
    end_date: toDateString(endDate),
    capacity: maxParticipants || undefined,
    team_size_min: teamMin,
    team_size_max: teamMax,
    status,
    event_type: type ? Number(type) : undefined,
    topics: tags.length ? tags : undefined,
  })

  const saveWithBanner = async (payload) => {
    let id
    if (isEdit) {
      await updateEvent({ id: initialData.id, ...payload }).unwrap()
      id = initialData.id
    } else {
      const result = await createEvent(payload).unwrap()
      id = result.id
    }
    if (bannerFile) {
      const fd = new FormData()
      fd.append("id", id)
      fd.append("banner", bannerFile)
      await updateEvent(fd).unwrap()
    }
    navigate('/organizer')
  }

  const handleSave = async () => {
    try {
      if (isLive) {
        const payload = buildPayload()
        if (bannerFile) {
          const fd = new FormData()
          fd.append("event", initialData.id)
          Object.keys(payload).forEach(k => {
            if (payload[k] !== undefined) {
              if (Array.isArray(payload[k])) {
                payload[k].forEach(val => fd.append(k, val))
              } else {
                fd.append(k, payload[k])
              }
            }
          })
          fd.append("banner", bannerFile)
          await createEditRequest(fd).unwrap()
        } else {
          await createEditRequest({ event: initialData.id, ...payload }).unwrap()
        }
        dispatch(addToast({ message: "Change request submitted for admin approval.", type: "success" }))
        navigate('/organizer')
        return
      }
      await saveWithBanner(buildPayload("draft"))
      dispatch(addToast({ message: "Saved as draft.", type: "success" }))
    } catch (err) {
      console.error("Save failed:", err?.data || err?.status || err)
      dispatch(addToast({ message: "Save failed.", type: "error" }))
    }
  }

  const handleSubmit = async () => {
    try {
      await saveWithBanner(buildPayload("pending"))
      dispatch(addToast({ message: "Submitted for review.", type: "success" }))
    } catch (err) {
      console.error("Submit failed:", err?.data || err?.status || err)
      dispatch(addToast({ message: "Submit failed.", type: "error" }))
    }
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.pageBody}>
          <div className={styles.bannerContainer}>
            <FileInput
              variant="banner"
              onChange={(e) => setBannerFile(e.target.files[0] || null)}
              previewUrl={initialData?.banner}
            />
            <div className={styles.bannerOverlay}>
              <div className={styles.bannerTopRight}>
                <SelectInput
                  label="Publicity"
                  options={publicityOptions}
                  value={publicity}
                  onChange={setPublicity}
                  variant="filter"
                  readOnly={isLive}
                />
              </div>
              <div className={styles.bannerBottomRow}>
                <div className={styles.bannerBottomLeft}>
                  <div className={styles.bannerTitleGroup}>
                    <TextInput
                      label="Title"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      inlineLabel
                      readOnly={isLive}
                    />
                    <span className={styles.bannerHost}>by <strong>You</strong></span>
                  </div>
                </div>
                <div className={styles.bannerBottomRight}>
                  <div className={styles.buttonGroup}>
                    <Button variant="disabled" className={styles.applyBtn}>
                      Apply
                    </Button>
                    <button className={styles.messageBtn} disabled>
                      <Icon icon="fluent:chat-32-filled" size={20} color="white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.detailsContainer}>
            <SelectInput
              label="Type"
              options={typeOptions}
              value={type}
              onChange={setType}
              readOnly={isLive}
            />
            <div className={styles.detailsGrid}>
              <div className={styles.detailsColumn}>
                <TextInput
                  label="Reward"
                  value={reward}
                  onChange={e => setReward(e.target.value)}
                />
                <DateInput
                  label="Start Date"
                  value={startDate}
                  onChange={setStartDate}
                />
                <DateInput
                  label="End Date"
                  value={endDate}
                  onChange={setEndDate}
                />
                <TextInput
                  label="Location"
                  placeholder="Virtual"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
                <CheckboxGroup label="Tags" value={tags} onChange={setTags} direction="row" readOnly={isLive}>
                  {topics.map(t => (
                    <CheckboxInput key={t.id} label={t.name} value={t.id} variant="secondary" />
                  ))}
                </CheckboxGroup>
              </div>
              <div className={styles.detailsColumn}>
                <NumberInput
                  label="Max Participants"
                  value={maxParticipants}
                  onChange={e => setMaxParticipants(Number(e.target.value))}
                />
                <NumberInput
                  label="Team Min"
                  value={teamMin}
                  onChange={e => setTeamMin(Number(e.target.value))}
                />
                <NumberInput
                  label="Team Max"
                  value={teamMax}
                  onChange={e => setTeamMax(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
          <div className={styles.descriptionContainer}>
            <h2 className={styles.descriptionHeading}>About this competition</h2>
            <TextArea
              label="Description"
              placeholder="Describe your competition..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div className={styles.formActions}>
            <div className={styles.formActionsLeft}>
              <Button variant="red-secondary" className={styles.formActionBtn} onClick={async () => { if (!initialData?.id) return; if (window.confirm('Delete this competition?')) { await deleteEvent(initialData.id).unwrap(); navigate('/organizer') } }}>Delete</Button>
            </div>
            <div className={styles.formActionsRight}>
              <Button variant="red-secondary" className={styles.formActionBtn} onClick={() => navigate('/organizer')}>Discard</Button>
              {isLive ? (
                <Button variant="primary" className={styles.formActionBtn} onClick={handleSave} disabled={isCreating || isRequesting}>{isCreating || isRequesting ? 'Submitting...' : 'Request Changes'}</Button>
              ) : (
                <>
                  <Button variant="secondary" className={styles.formActionBtn} onClick={handleSave} disabled={isCreating || isUpdating}>{isCreating || isUpdating ? 'Saving...' : 'Save'}</Button>
                  <Button variant="primary" className={styles.formActionBtn} onClick={handleSubmit} disabled={isCreating || isUpdating}>{isCreating || isUpdating ? 'Submitting...' : 'Submit'}</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompetitionForm
