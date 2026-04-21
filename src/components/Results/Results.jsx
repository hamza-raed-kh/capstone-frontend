import CardGroup from "../CardGroup/CardGroup"
import styles from './Results.module.css'

// const VARIANTS = {
//     explore: {icon: '', text: '', category: ''},
// }

const Results = ({ cardgroups }) => {
    let variant = 'main'
    let banner_url = "https://img.freepik.com/premium-photo/abstract-rainbow-colorful-bright-feather-closeup-up-macro-view-background-plumage-texture-withlet -dew-drops_753134-644.jpg?w=2000"
    let info = {title: "Web3 Hackathon", description: "Create decentralized applications using blockchain technology and smart  contracts. Build innovative DeFi, NFT, or DAO solutions that"}
    let details = {prize: "Prize", participants_now: "Now", participants_max: "Max", date_start: "Start", date_end: "End", virtual: true, location: "Location", categories: ["Crypto", "AI"]}
    let button = {variant: "primary", children: "Apply"}
    let onClick = {view: function(){}}

    let eventcards = [
          { variant, banner_url, info, details, button, onClick },
          { variant, banner_url, info, details, button, onClick },
          { variant, banner_url, info, details, button, onClick },
          { variant, banner_url, info, details, button, onClick },
          { variant, banner_url, info, details, button, onClick },
          { variant, banner_url, info, details, button, onClick },
          { variant, banner_url, info, details, button, onClick },
      ]
    
    cardgroups = cardgroups || [
        {icon: '', title: '', category: '', eventcards},
    ]
  
    return (
        <div className={`${styles.results}`}>
            {cardgroups.map((_, index) => (
                <CardGroup key={index} icon={_.icon} title={_.title} category={_.category} eventcards={_.eventcards}/>
            ))}
        </div>
    );
}

export default Results