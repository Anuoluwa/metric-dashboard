import React, { useEffect, useState } from "react";
import MultilineChart from "../MultilineChart";
import Legend from "./Legend";
import styles from "./index.module.scss";
import {
  loadMetrics,
  loadMovingAverageMetrics,
} from "../../redux/actions/metricActions";
import { connect } from "react-redux";
import axios from "axios";
import transformData from "../../utils/transformData";
import * as d3 from "d3";

const baseURL = "https://metrics-fact.herokuapp.com/api/v1";

const dimensions = {
  width: 730,
  height: 400,
  margin: {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30,
  },
};

const Chart = (props) => {
  const dateParser = d3.timeParse("%m/%d/%Y, %H:%M:%S %p");
  const [selectedItems, setSelectedItems] = useState([]);
  const [minuteMetrics, setMinuteMetrics] = useState([]);
  const [hourMetrics, setHourMetrics] = useState([]);
  const [dayMetrics, setDayMetrics] = useState([]);

  useEffect(() => {
    props.loadMetrics();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${baseURL}/metrics/?windowPeriod=minute`);
      setMinuteMetrics(result.data.body);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${baseURL}/metrics/?windowPeriod=hour`);
      setHourMetrics(result.data.body);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${baseURL}/metrics/?windowPeriod=day`);
      setDayMetrics(result.data.body);
    };
    fetchData();
  }, []);

  const { metrics } = props.metric;

  let transformedPrimaryMetrics = transformData(metrics);
  let transformedMinuteMetrics = transformData(minuteMetrics);
  let transformedHourMetrics = transformData(hourMetrics);
  let transformedDayMetrics = transformData(dayMetrics);

  const primaryData = {
    name: "Primary Metrics",
    color: "#ffffff",
    items: transformedPrimaryMetrics.map((d) => ({
      ...d,
      date: dateParser(d.date),
    })),
  };
  const minuteData = {
    name: "Minute Metrics",
    color: "#0000FF",
    items: transformedMinuteMetrics.map((d) => ({
      ...d,
      date: dateParser(d.date),
    })),
  };
  const hourData = {
    name: "Hour Metrics",
    color: "#5e4fa2",
    items: transformedHourMetrics.map((d) => ({
      ...d,
      date: dateParser(d.date),
    })),
  };

  const dayData = {
    name: "Day Metrics",
    color: "green",
    items: transformedDayMetrics.map((d) => ({
      ...d,
      date: dateParser(d.date),
    })),
  };

  const legendData = [primaryData, minuteData, hourData, dayData];

  const chartData = [
    primaryData,
    ...[minuteData, hourData, dayData].filter((d) =>
      selectedItems.includes(d.name)
    ),
  ];

  const onChangeSelection = (name) => {
    const newSelectedItems = selectedItems.includes(name)
      ? selectedItems.filter((item) => item !== name)
      : [...selectedItems, name];
    setSelectedItems(newSelectedItems);
  };

  return (
    <div className={styles.Chart}>
      <Legend
        data={legendData}
        selectedItems={selectedItems}
        onChange={onChangeSelection}
      />
      <MultilineChart data={chartData} dimensions={dimensions} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  metric: state.metric,
});

export default connect(mapStateToProps, {
  loadMetrics,
  loadMovingAverageMetrics,
})(Chart);
