import { Outlet, useLocation } from "react-router-dom"
import SectionedLayout from "../SectionedLayout/SectionedLayout"

function OrganizerCenterLayout() {
    const location = useLocation()
    const backLink = location.pathname !== '/organizer' 
        ? { label: "Back to Center", to: "/organizer", end: true } 
        : null

    return (
        <SectionedLayout preset="organizer" backLink={backLink}>
            <Outlet />
        </SectionedLayout>
    )
}

export default OrganizerCenterLayout
