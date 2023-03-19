import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { socket } from "../../App";
// eslint-disable-next-line
import Chart from "chart.js/auto";
import { getHum } from "../../features/device/deviceSlice";

function ChartHumidity() {
  const dispatch = useDispatch();

  const { humidity } = useSelector((state) => state.device);
  const [humidityData, setHumidityData] = useState([]);

  useEffect(() => {
    socket.on("humidity", (data) => {
      const { _id, humidity, createdAt, updatedAt } = data;
      setHumidityData((prevData) => [
        { _id, humidity, createdAt, updatedAt },
        ...prevData.slice(0, 120),
      ]);
    });
  }, []);

  useEffect(() => {
    dispatch(getHum());

    setHumidityData(humidity);
  }, [dispatch, humidity]);

  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);

  const filteredHumData = humidityData.filter((item) => {
    const itemDate = new Date(item.createdAt);
    return itemDate >= oneDayAgo && itemDate <= now;
  });

  const data = {
    labels: filteredHumData.map((data) =>
      new Date(data.createdAt).toLocaleTimeString()
    ),
    datasets: [
      {
        label: "Wilgotność",
        data: filteredHumData.map((data) => data.humidity),
        fill: false,
        borderColor: "rgba(30, 79, 135, 0.7)",
        tension: 0.2,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: `Czas (ostatnie 12h)`,
        },
      },
      y: {
        title: {
          display: true,
          text: "Wilgotność (%)",
        },
      },
    },
    interaction: {
      mode: "nearest",
      intersect: false,
    },
  };

  return <Line data={data} options={options} />;
}

export default ChartHumidity;
