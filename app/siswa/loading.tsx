import { Spin } from "antd/lib";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <Spin spinning={true} fullscreen />;
}
