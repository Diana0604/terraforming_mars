"use client"
import { useContext, useEffect, useState } from "react";
import styles from "../page.module.css"
import { Resource } from "@/types";
import { CorporationsContext } from "@/contexts/CorporationsContexts";
import { Col, Row } from 'antd';

const InfoBar = () => {

    const [resources, setResources] = useState<Resource[]>();
    const [resourcesNextRound, setResourcesNextRound] = useState<Resource[]>();
    const { playerCorporation } = useContext(CorporationsContext)

    useEffect(() => {
        setResources(playerCorporation.resourcesOwned)

        setResourcesNextRound(playerCorporation.resourcesNextRound)
    }, [playerCorporation])

    const switchIcons = (name: string) => {
        switch (name) {
            case "Rare Metal":
                return <img className={styles.icons} src="/icons/gold.png" />;
            case "Water":
                return <img className={styles.icons} src="/icons/waterdrop.png" />;
            case "Oxygen":
                return <img className={styles.icons} src="/icons/oxygen-tank.png" />;
            case "Food":
                return <img className={styles.icons} src="/icons/fork.png" />;
            case "Synthetics":
                return <img className={styles.icons} src="/icons/plastic-bottle.png" />;
            case "Minerals":
                return <img className={styles.icons} src="/icons/rock.png" />;
            default:
                return <img className={styles.icons} src="/icons/fork.png" />;

        }
    }

    return (
        <div className={styles.infoBar}>
            <p>{playerCorporation.name}</p>
            {resources && resources.map((resource, index) => {
                return <Row key={index} style={{ padding: "10px" }}>
                    <Col span={12} style={{ width: "30px" }} >
                            <div style={{textAlign: 'center'}}>
                                {switchIcons(resource.name)}
                            </div>
                            <div style={{textAlign: 'center'}}>{resource.quantity} </div>
                    </Col>

                    <Col span={12}>
                        {resourcesNextRound && resourcesNextRound.length >= index && <div>{Math.sign(resourcesNextRound[index].quantity - resource.quantity) === 1 && '+'}{resourcesNextRound[index].quantity - resource.quantity}</div>}
                    </Col>
                </Row>
            })}

        </div>
    )
}

export default InfoBar;