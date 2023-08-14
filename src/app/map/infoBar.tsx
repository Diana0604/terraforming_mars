"use client"
import { useEffect, useState } from "react";
import styles from "../page.module.css"
import { Resource, Corporation } from "@/types";

const InfoBar = () => {

    const myCorporation = "Player"
    const [resources, setResources] = useState<Resource[]>();

    useEffect(() => {

        const data:Promise<Corporation> = fetch(`/api/corporation?name=${myCorporation}`).then(res => res.json())
        data.then(corp => {
            setResources(corp.resourcesOwned)
        })

    }, [])

    return (
        <div className={styles.infoBar}>
            <p>Corporation: {myCorporation}</p>
            { resources && resources.map(resource => {
                return <div>
                   <p>{resource.name}</p> 
                   <p>{resource.quantity}</p> 
                    </div>
            })}
        </div>
    )
}

export default InfoBar;