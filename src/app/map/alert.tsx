"use client"
import { useContext, useEffect, useState } from "react";
import styles from "../page.module.css"
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