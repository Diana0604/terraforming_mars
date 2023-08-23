"use client"
import { useEffect, useState } from "react";
import styles from "../page.module.css"
import { Resource, Corporation } from "@/types";
import { PLAYER_CORPORATION_NAME } from "@/constants";

const InfoBar = () => {

    const myCorporation = PLAYER_CORPORATION_NAME
    const [resources, setResources] = useState<Resource[]>();

    useEffect(() => {

        const data:Promise<Corporation> = fetch(`/api/corporation?name=${myCorporation}`).then(res => res.json())
        data.then(corp => {
            setResources(corp.resourcesOwned)
        })

    }, [])

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
            <p>{myCorporation}</p>
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