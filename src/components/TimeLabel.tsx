export interface TimeLabelProps {
  time: string;
}

const TimeLabel = ({ time }: TimeLabelProps) => {
  const [hour, minute] = time.split(':');
  const date = new Date();

  date.setHours(Number(hour), Number(minute));

  const formato = new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
  const formatedTime = formato.format(date);

  return <>{formatedTime}</>;
};

export default TimeLabel;
