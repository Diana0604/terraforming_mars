"use client"
import { useContext } from "react";
import styles from "../map.module.css"
import { AlertContext } from "@/contexts/AlertContext";

const Alert = () => {

    const message = useContext(AlertContext)

    return <>
        {
            message.message && <div className={styles.alertMessage}>{message.message}</div>
        }
        </>
    
}

export default Alert;