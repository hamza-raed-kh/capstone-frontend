import { useNavigate } from "react-router-dom"
import CardGroup from '../CardGroup/CardGroup'
import UserList from '../UserList/UserList'
import styles from './Results.module.css'

/**
 * A results component with different visual styles.
 * This component supports various `variants` that apply different CSS classes
 * to the results, allowing for a consistent look and feel across the application.
 *
 * @param {object} props - The properties for the cardgroup.
 * @param {"cardgroups" | "userlists"?} [props.variant = "cardgroups"] - The visual variant of the card group.
 * @param {Array<Object>} props.sections - The list of card objects that need to be rendered.
 * @returns {JSX.Element} The rendered cardgroup element.
 */
const Results = ({ variant = 'cardgroups', sections }) => {
    const navigate = useNavigate()
    let card_variant = 'main'
    let banner_url = "https://img.freepik.com/premium-photo/abstract-rainbow-colorful-bright-feather-closeup-up-macro-view-background-plumage-texture-withlet -dew-drops_753134-644.jpg?w=2000"
    let info = {title: "Web3 Hackathon", description: "Create decentralized applications using blockchain technology and smart  contracts. Build innovative DeFi, NFT, or DAO solutions that"}
    let details = {prize: "Prize", participants_now: "Now", participants_max: "Max", date_start: "Start", date_end: "End", virtual: true, location: "Location", categories: ["Crypto", "AI"]}
    let button = {variant: "primary", children: "Apply"}
    let onClick = {view: () => navigate('/competition/1')}

    let eventcards = [
          { variant: card_variant, banner_url, info, details, button, onClick },
          { variant: card_variant, banner_url, info, details, button, onClick },
          { variant: card_variant, banner_url, info, details, button, onClick },
          { variant: card_variant, banner_url, info, details, button, onClick },
          { variant: card_variant, banner_url, info, details, button, onClick },
          { variant: card_variant, banner_url, info, details, button, onClick },
          { variant: card_variant, banner_url, info, details, button, onClick },
      ]
    
    sections = sections || [
        {icon: '', title: 'section', category: '', eventcards},
    ]
  
    return (
        <div className={`${styles.results}`}>
            {variant === 'cardgroups'?
                sections.map((_, index) => (
                    <CardGroup
                    key={index}
                    icon={_.icon}
                    title={_.title}
                    category={_.category}
                    eventcards={_.eventcards}/>
                )) :

            variant === 'userlists'?
                sections.map((_, index) => (
                    <UserList
                        key={index}
                        icon={_.icon}
                        title={_.title}
                        category={_.category}
                        userrecords={_.userrecords}
                    />
                )) :

            (<></>)
            }
        </div>
    );
}

export default Results