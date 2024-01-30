import { Calendar, Card } from "antd";

interface dataType {
  data: any;
  isFetching: boolean;
}

export const EventCalendar: React.FC<dataType> = ({ data, isFetching }) => {
  return (
    <Card>
      <Calendar fullscreen={false} />
    </Card>
  );
};
