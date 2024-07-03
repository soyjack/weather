import React from "react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return(
        <div className="footer">
            <p>© {currentYear} Copyright. All Rights Reserved!</p>
        </div>
    );
}