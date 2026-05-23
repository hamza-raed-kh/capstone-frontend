import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import FAQ from "../../../components/data/FAQ/FAQ"
import SectionHeader from "../../../components/ui/SectionHeader/SectionHeader"
import Modal from "../../../components/ui/Modal/Modal"
import TextInput from "../../../components/inputs/TextInput/TextInput"
import TextArea from "../../../components/inputs/TextArea/TextArea"
import { Button } from "../../../components/inputs/Button/Button"
import Icon from "../../../components/ui/Icon/Icon"
import { useGetMeQuery } from "../../../features/api/authApi"
import { useGetEventQuery } from "../../../features/api/eventApi"
import {
    useGetFaqQuestionsQuery,
    useCreateFaqQuestionMutation,
    useUpdateFaqQuestionMutation,
    useDeleteFaqQuestionMutation,
} from "../../../features/api/faqApi"
import styles from "./FaqPage.module.css"

const EMPTY_FORM = { question_text: "", answer_text: "" }

const FaqPage = () => {
    const { eventId } = useOutletContext()

    const { data: me } = useGetMeQuery()
    const { data: event } = useGetEventQuery(Number(eventId))
    const { data: faqData } = useGetFaqQuestionsQuery({ event: eventId })
    const [createFaq] = useCreateFaqQuestionMutation()
    const [updateFaq] = useUpdateFaqQuestionMutation()
    const [deleteFaq] = useDeleteFaqQuestionMutation()

    const faqs = faqData?.results || []
    const isOrganizer = me?.id === event?.organizer

    const [modalOpen, setModalOpen] = useState(false)
    const [editingFaq, setEditingFaq] = useState(null)
    const [form, setForm] = useState(EMPTY_FORM)
    const [saving, setSaving] = useState(false)

    const openCreate = () => {
        setEditingFaq(null)
        setForm(EMPTY_FORM)
        setModalOpen(true)
    }

    const openEdit = (faq) => {
        setEditingFaq(faq)
        setForm({ question_text: faq.question_text, answer_text: faq.answer_text })
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
        setEditingFaq(null)
        setForm(EMPTY_FORM)
    }

    const handleSave = async () => {
        if (!form.question_text.trim() || !form.answer_text.trim()) return
        setSaving(true)
        try {
            if (editingFaq) {
                await updateFaq({ id: editingFaq.id, ...form }).unwrap()
            } else {
                await createFaq({ event: Number(eventId), ...form }).unwrap()
            }
            closeModal()
        } catch (err) {
            console.error("Save FAQ failed:", err?.data || err?.status || err)
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (faq) => {
        if (!window.confirm("Delete this FAQ question?")) return
        try {
            await deleteFaq(faq.id).unwrap()
        } catch (err) {
            console.error("Delete FAQ failed:", err?.data || err?.status || err)
        }
    }

    return (
        <div className={styles.pageContainer} style={{ overflow: "visible" }}>
            <div className={styles.bodyContainer}>
                <div className={styles.bodyHeader}>
                    <SectionHeader icon={"material-symbols:question-mark-rounded"} title={"FAQ"} category={"Official"} />
                </div>
                <div className={styles.bodyQuestionList}>
                    {faqs.length === 0 && (
                        <p className={styles.emptyText}>No FAQ questions yet.</p>
                    )}
                    {faqs.map((faq) => (
                        <div className={styles.faqWrapper} key={faq.id}>
                            <FAQ question={faq.question_text} answer={faq.answer_text} />
                            {isOrganizer && (
                                <div className={styles.questionActions}>
                                    <button className={styles.actionBtn} onClick={() => openEdit(faq)} aria-label="Edit">
                                        <Icon icon="mdi:pencil" size={16} />
                                    </button>
                                    <button className={styles.actionBtn} onClick={() => handleDelete(faq)} aria-label="Delete">
                                        <Icon icon="mdi:trash-can-outline" size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {isOrganizer && (
                <button className={styles.fab} onClick={openCreate} aria-label="Add FAQ">
                    <Icon icon="mdi:plus" size={28} />
                </button>
            )}

            <Modal isOpen={modalOpen} onClose={closeModal} title={editingFaq ? "Edit FAQ" : "New FAQ"}>
                <div className={styles.modalForm}>
                    <TextInput
                        label="Question"
                        placeholder="Enter the question"
                        value={form.question_text}
                        onChange={(e) => setForm({ ...form, question_text: e.target.value })}
                    />
                    <TextArea
                        label="Answer"
                        placeholder="Enter the answer"
                        value={form.answer_text}
                        onChange={(e) => setForm({ ...form, answer_text: e.target.value })}
                        rows={4}
                    />
                    <div className={styles.modalActions}>
                        <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                        <Button variant="primary" onClick={handleSave} disabled={saving}>
                            {saving ? "Saving..." : editingFaq ? "Update" : "Create"}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default FaqPage
