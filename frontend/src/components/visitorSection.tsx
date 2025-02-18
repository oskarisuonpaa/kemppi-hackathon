import axios from "axios";
import { useEffect, useState, CSSProperties } from "react";

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

interface BackendDataItem {
  title: string;
  image: string;
  value: string | number;
}

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const VisitorSection = () => {
  const { width } = useWindowDimensions();
  const [data, setData] = useState<BackendDataItem[]>([]);

  const boxSize = Math.max(width / 6, 200);

  const infoBoxStyle: CSSProperties = {
    border: "5px solid #F57300",
    borderRadius: "10px",
    margin: "10px",
    width: `${boxSize}px`,
    height: `${boxSize}px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#cccccc",
    color: "#000000",
    padding: "5px",
  };

  const imageStyle: CSSProperties = {
    backgroundColor: "transparent",
    width: `${boxSize * 0.5}px`,
    height: `${boxSize * 0.5}px`,
    objectFit: "contain",
  };

  const titleStyle: CSSProperties = {
    fontSize: `${boxSize * 0.1}px`,
    margin: "5px 0",
  };

  const valueStyle: CSSProperties = {
    fontSize: `${boxSize * 0.1}px`,
    margin: "5px 0",
  };

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/visitor`);
        setData(response.data);
      } catch (err) {
        console.error("Error fetching visitor data:", err);
      }
    };
    fetchVisitorData();
  }, []);

  const infoBox = (item: BackendDataItem) => {
    return (
      <div key={item.title} style={infoBoxStyle}>
        <h2 style={titleStyle}>{item.title}</h2>
        <img src={item.image} alt="" style={imageStyle} />
        <h3 style={valueStyle}>{item.value}</h3>
      </div>
    );
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1>Visitor section</h1>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {data.map((item) => infoBox(item))}
      </div>
    </div>
  );
};

export default VisitorSection;
