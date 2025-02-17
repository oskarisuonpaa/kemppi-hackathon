import axios from "axios";
import React, { useEffect, useState, CSSProperties } from "react";
import { Background, Border } from "victory";

interface BackendDataItem {
    title: string;
    image: string;
    value: string | number;
}

const infoBoxStyle: CSSProperties = {
    border: '5px solid #F57300',
    borderRadius: '10px', // Changed from 'BorderRadius' to 'borderRadius' and set to '10px' for rounded cornerss
    margin: '10px',
    width: `${window.innerWidth / 6}px`,
    height: `${window.innerWidth / 6}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#cccccc',
    color: '#000000',
    padding: '5px',
}

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const VisitorSection = () => {
    const [data, setData] = useState<BackendDataItem[]>([]);
    useEffect(() => {
        const fetchVisitorData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/visitor`);
                setData(response.data);
            } catch (err) {
                console.error('Error fetching visitor data:', err);
            }
        }
        fetchVisitorData();
    }, [])

    const infoBox = (item: BackendDataItem) => {
        return (
            <div key={item.title} style={infoBoxStyle}>
                <h2>{item.title}</h2>
                <img src={item.image} alt="" style={{ backgroundColor: 'transparent', width: '100px', height: '100px'}} />
                <h3>{item.value}</h3>
            </div>
        )
    }
    return (
        <div style={{textAlign: 'center', margin: '20px'}}>
            <h1>Visitor section</h1>
            <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
            {data.map(item => infoBox(item))}
            </div>
        </div>
    )
}

export default VisitorSection