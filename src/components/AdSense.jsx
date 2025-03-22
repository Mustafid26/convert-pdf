import React, { useEffect } from "react";

const AdSense = () => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error", e);
        }
    }, []);

    return (
        <div className="w-full flex justify-center">
            <ins 
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXX" 
                data-ad-slot="1234567890"
                data-ad-format="auto"
                data-full-width-responsive="true">
            </ins>
        </div>
    );
};

export default AdSense;
