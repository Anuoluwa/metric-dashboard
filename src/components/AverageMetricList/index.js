import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadMetrics } from "../../redux/actions/metricActions";
import MetricItem from "../MetricItem";
import EmptyState from "../EmptyState";
import LoadingState from "../LoadingState";
import TableHeader from "../TableHeader";
import styles from "./index.module.scss";

const AverageMetricList = (props) => {
  useEffect(() => {
    props.loadMetrics();
  }, []);

  const { metrics, isLoading } = props.metric;

  const total_metrics = metrics?.length;

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className={styles._}>
      <div className={styles.header}>
        <TableHeader table_title="Metrics" total_items={total_metrics} />
      </div>
      <div className={styles.container}>
        <div className={styles.table_head}>
          <div>Name</div>
          <div>Value</div>
          <div>Time</div>
        </div>
        <div className={styles.metric_list}>
          {total_metrics === 0 ? (
            <EmptyState message="No added metric" />
          ) : (
            metrics.map((metric) => {
              return <MetricItem key={metric?._time} {...metric} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  metric: state.metric,
});

export default connect(mapStateToProps, { loadMetrics })(AverageMetricList);
