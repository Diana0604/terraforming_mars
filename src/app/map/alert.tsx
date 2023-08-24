"use client"
import { useContext, useEffect, useState } from "react";
import styles from "../page.module.css"
import { AlertContext } from "@/contexts/AlertContext";

const Alert = () => {

    const message = useContext(AlertContext)

    useEffect(() => {
        console.log(message.message)
    }, [message])

    return <div>
        {
            message.message.length >0 && <div className={styles.alertMessage}>{message.message}</div>     
        }
        </div>
    
}

export default Alert;