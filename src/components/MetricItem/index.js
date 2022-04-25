import React from "react";
import styles from "./index.module.scss";

const MetricItem = ({ ...metric_item }) => {
  return (
    <div className={styles.table_row}>
      <div className={styles.col}>
        <p>{metric_item?.name}</p>
      </div>
      <div className={styles.col}>
        <p>{metric_item?._value}</p>
      </div>
      <div className={styles.col}>
        <p>{metric_item?._time}</p>
      </div>
    </div>
  );
};

export default MetricItem;
