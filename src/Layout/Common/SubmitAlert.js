import React, { useEffect, useState } from "react";

export default function SubmitAlert({form, alertType}){
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() =>{
            alertType === "warning" && setAlertMessage("Saving...");
            alertType === "danger" && setAlertMessage(`Unable to save this ${form}`);
            alertType === "success" && setAlertMessage(`Your ${form} is saved.`);
            alertType === "" && setAlertMessage("");
    },[alertType, form])


    return (
        <div className={`alert badge mb-3 alert-${alertType} p-2 ml-1`} role="alert">
            {alertMessage}
        </div>
    )
}