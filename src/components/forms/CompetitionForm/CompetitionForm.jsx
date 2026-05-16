import { useState } from "react"
import { useNavigate } from "react-router-dom"
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

const typeOptions = [
  { value: "Hackathon", label: "Hackathon" },
  { value: "Competition", label: "Competition" },
  { value: "Challenge", label: "Challenge" },
  { value: "Tournament", label: "Tournament" },
]

const publicityOptions = [
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
]

function CompetitionForm({ initialData, isEdit }) {
  const navigate = useNavigate()
  const [title, setTitle] = useState(initialData?.title || "")
  const [type, setType] = useState(initialData?.type || "")
  const [publicity, setPublicity] = useState(initialData?.publicity || "public")
  const [reward, setReward] = useState(initialData?.reward || "")
  const [location, setLocation] = useState(initialData?.location || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [startDate, setStartDate] = useState(initialData?.startDate || "")
  const [endDate, setEndDate] = useState(initialData?.endDate || "")
  const [maxParticipants, setMaxParticipants] = useState(initialData?.maxParticipants || 0)
  const [teamMin, setTeamMin] = useState(initialData?.teamSpec?.min || 1)
  const [teamMax, setTeamMax] = useState(initialData?.teamSpec?.max || 1)
  const [tags, setTags] = useState(initialData?.tags || [])

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.pageBody}>
            <div className={styles.bannerContainer}>
              <FileInput variant="banner" />
            <div className={styles.bannerOverlay}>
              <div className={styles.bannerTopRight}>
                <SelectInput
                  label="Publicity"
                  options={publicityOptions}
                  value={publicity}
                  onChange={setPublicity}
                  variant="filter"
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
                <CheckboxGroup label="Tags" value={tags} onChange={setTags} direction="row">
                  <CheckboxInput label="AI" value="AI" variant="secondary" />
                  <CheckboxInput label="Web Dev" value="Web Dev" variant="secondary" />
                  <CheckboxInput label="UI/UX" value="UI/UX" variant="secondary" />
                  <CheckboxInput label="Mobile" value="Mobile" variant="secondary" />
                  <CheckboxInput label="Data" value="Data" variant="secondary" />
                  <CheckboxInput label="Security" value="Security" variant="secondary" />
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
              <Button variant="red-secondary" className={styles.formActionBtn} onClick={() => navigate('/organizer/competitions')}>Delete</Button>
            </div>
            <div className={styles.formActionsRight}>
              <Button variant="red-secondary" className={styles.formActionBtn} onClick={() => navigate('/organizer/competitions')}>Discard</Button>
              <Button variant="secondary" className={styles.formActionBtn} onClick={() => navigate('/organizer/competitions')}>Save</Button>
              <Button variant="primary" className={styles.formActionBtn} onClick={() => navigate('/organizer/competitions')}>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompetitionForm
