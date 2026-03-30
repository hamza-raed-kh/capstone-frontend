// import { useState } from 'react'
import './App.css'
import SectionedLayout from './layouts/SectionedLayout'
import BoxLayout from './layouts/BoxLayout'

function App() {
    function selectSectionedLayout(){
        return false
    }

    // function selectPage(){
    //     return ExplorePage
    // }

    return (
        <div className="screen">
            {selectSectionedLayout()? <SectionedLayout/>: <BoxLayout/>}
        </div>
)
}

export default App
