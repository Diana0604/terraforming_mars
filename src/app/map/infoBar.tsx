"use client"
import { useContext, useEffect, useState } from "react";
import styles from "../page.module.css"
import { Resource } from "@/types";
import { CorporationsContext } from "@/contexts/CorporationsContexts";

const InfoBar = () => {

    const [resources, setResources] = useState<Resource[]>();
    const {playerCorporation} = useContext(CorporationsContext)

    useEffect(() => {
        setResources(playerCorporation.resourcesOwned)
    }, [playerCorporation])

    const switchIcons = (name:string) => {
        switch(name) {
            case "Rare Metal":
                return <img className={styles.icons} src="/icons/gold.png"/>;
            case "Water":
                return <img className={styles.icons} src="/icons/waterdrop.png"/>;
            case "Oxygen":
                return <img className={styles.icons} src="/icons/oxygen-tank.png"/>;
            case "Food":
                return <img className={styles.icons} src="/icons/fork.png"/>;
            case "Synthetics":
                return <img className={styles.icons} src="/icons/plastic-bottle.png"/>;
            case "Minerals":
                return <img className={styles.icons} src="/icons/rock.png"/>;
            default:
                return <img className={styles.icons} src="/icons/fork.png"/>;
        
        }
    }

    return (
        <div className={styles.infoBar}>
            <p>{playerCorporation.name}</p>
            { resources && resources.map((resource, index) => {
                return <div key={index} style={{padding: "5px"}}>
                   <div style={{width: "30px"}}>
                    {switchIcons(resource.name)}
                   </div>
                   {/* <p>{resource.name}</p>  */}
                   <p>{resource.quantity}</p> 
                    </div>
            })}
        </div>
    )
}

export default InfoBar;