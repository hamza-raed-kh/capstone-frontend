import { useNavigate } from "react-router-dom"
import FilterRow from "../../../components/FilterRow/FilterRow"
import Results from "../../../components/Results/Results"
import SearchBar from "../../../components/SearchBar/SearchBar"
import SectionedLayout from "../../../layouts/SectionedLayout/SectionedLayout"
import styles from './ChangeRequestPage.module.css'

function ChangeRequestPage() {
    const navigate = useNavigate()
    let variant = 'main'
    let banner_url = "https://img.freepik.com/premium-photo/abstract-rainbow-colorful-bright-feather-closeup-up-macro-view-background-plumage-texture-withlet -dew-drops_753134-644.jpg?w=2000"
    let info = {title: "Web3 Hackathon", description: "Create decentralized applications using blockchain technology and smart  contracts. Build innovative DeFi, NFT, or DAO solutions that"}
    let details = {prize: "Prize", participants_now: "Now", participants_max: "Max", date_start: "Start", date_end: "End", virtual: true, location: "Location", categories: ["Crypto", "AI"]}
    let button = {variant: "primary", children: "Apply"}
    let onClick = {view: () => navigate('/competition/1')}
    
    let eventcards = [
        { variant, banner_url, info, details, button, onClick },
        { variant, banner_url, info, details, button, onClick },
        { variant, banner_url, info, details, button, onClick },
    ]

    let admin_variant = 'admin'
    let admin_onClick = {view: () => navigate('/admin/competition/1/review'), approve: () => {}, reject: () => {}}

    let admin_eventcards = [
        { variant: admin_variant, banner_url, info, details, button, onClick: admin_onClick },
        { variant: admin_variant, banner_url, info, details, button, onClick: admin_onClick },
        { variant: admin_variant, banner_url, info, details, button, onClick: admin_onClick },
    ]
    
    let cardgroups =[
        {icon: 'mage:edit-pen-fill', title: 'Change Requests', category: '', eventcards: admin_eventcards},
        {icon: 'material-symbols:history-rounded', title: 'History', category: '', eventcards},
    ]


    return (
        <SectionedLayout preset="admin">
            <div className={styles.pageContainer}>
                <div className={styles.pageSearchSection}>
                    <SearchBar />
                </div>
                <div className={styles.pageFiltersSection}>
                    <FilterRow />
                </div>
                <div className={styles.pageResultsSection}>
                    <Results variant={'cardgroups'} sections={cardgroups}/>
                </div>
            </div>
        </SectionedLayout>
    )
}

export default ChangeRequestPage
