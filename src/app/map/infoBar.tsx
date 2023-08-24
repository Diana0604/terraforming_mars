"use client"
import { useContext, useEffect, useState } from "react";
import styles from "../page.module.css"
import { Resource } from "@/types";
import { CorporationsContext } from "@/contexts/CorporationsContexts";
import Image from "next/image"

const InfoBar = () => {

    const [resources, setResources] = useState<Resource[]>();
    const { playerCorporation } = useContext(CorporationsContext)

    useEffect(() => {
        setResources(playerCorporation.resourcesOwned)
    }, [playerCorporation])

    const switchIcons = (name: string) => {
        switch (name) {
            case "Rare Metal":
                return <div className={styles.icons}><Image fill={true} alt='icon for gold material' src="/icons/gold.png" />;</div>
            case "Water":
                return <div className={styles.icon}><Image fill={true} alt='icon for water material' src="/icons/waterdrop.png" /></div>;
            case "Oxygen":
                return <div className={styles.icon}><Image fill={true} alt='icon for oxygen material' src="/icons/oxygen-tank.png" /></div>;
            case "Food":
                return <div className={styles.icon}><Image fill={true} alt='icon for food material' src="/icons/fork.png" /></div>;
            case "Synthetics":
                return <div className={styles.icon}><Image fill={true} alt='icon for synthetics material' src="/icons/plastic-bottle.png" /></div>;
            case "Minerals":
                return <div className={styles.icon}><Image fill={true} alt='icon for minerals material' src="/icons/rock.png" /></div>;
            default:
                return <div className={styles.icon}><Image fill={true} alt='icon for generic material' src="/icons/fork.png" /></div>;

        }
    }

    return (
        <div className={styles.infoBar}>
            <p>{playerCorporation.name}</p>
            {resources && resources.map((resource, index) => {
                return <div key={index} style={{ padding: "5px" }}>
                    <div style={{ width: "30px" }}>
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