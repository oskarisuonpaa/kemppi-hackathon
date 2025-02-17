import axios from "axios";
import React, { useEffect, useState } from "react";



const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const [data, setData] = useState<BackendData>([]);

const VisitorSection = () => {
    return (
        <div>
            <h1>Visitor section</h1>
        </div>
    )
}

export default VisitorSection