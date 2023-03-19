import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { socket } from "../../App";
// eslint-disable-next-line
import Chart from "chart.js/auto";
import { getTemp } from "../../features/device/deviceSlice";

function ChartTemperature() {
  const dispatch = useDispatch();

  const { temp } = useSelector((state) => state.device);
  const [temperatureData, setTemperatureData] = useState([]);

  useEffect(() => {
    socket.on("temp", (data) => {
      const { _id, temp, createdAt, updatedAt } = data;
      setTemperatureData((prevData) => [
        { _id, temp, createdAt, updatedAt },
        ...prevData.slice(0, 120),
      ]);
    });
  }, []);

  useEffect(() => {
    dispatch(getTemp());

    setTemperatureData(temp);
  }, [dispatch, temp]);

  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);

  const filteredTempData = temperatureData.filter((item) => {
    const itemDate = new Date(item.createdAt);
    return itemDate >= oneDayAgo && itemDate <= now;
  });

  const data = {
    labels: filteredTempData.map((data) =>
      new Date(data.createdAt).toLocaleTimeString()
    ),
    datasets: [
      {
        label: "Temperatura",
        data: filteredTempData.map((data) => data.temp),
        fill: false,
        borderColor: "rgba(82, 161, 35, 0.7)",
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
          text: "Temperatura (°C)",
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

export default ChartTemperature;
