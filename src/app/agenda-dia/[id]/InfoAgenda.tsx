import Card from '@/components/Card';
import TextGroup from '@/components/TextGroup';

export interface InfoDataAdm {
  especialidad: string;
  tipo: string;
  atencion: string;
  atendiendoEn: string;
  horaInicio: string | undefined;
  horaCierre: string | undefined;
  usaMinutosDinamicos: boolean;
  minutosTurno: number;
  usuario: string;
  faltan: string;
}

export const InfoDateAdmDef = (): InfoDataAdm => {
  return {
    especialidad: '',
    tipo: '',
    atencion: '',
    atendiendoEn: '',
    horaInicio: '',
    horaCierre: '',
    usaMinutosDinamicos: false,
    minutosTurno: 15,
    usuario: '',
    faltan: '',
  };
};

export interface InfoDataMed {
  especialidad: string;
  atendiendoEn: string;
  horaInicio: string | undefined;
  horaCierre: string | undefined;
}

export const InfoDateMedDef = (): InfoDataMed => {
  return {
    especialidad: '',
    atendiendoEn: '',
    horaInicio: '',
    horaCierre: '',
  };
};

interface KeyValueItem {
  key: string;
  value: string;
  color?: string;
}

interface InfoAgendaProps {
  data: InfoDataAdm | InfoDataMed;
}

const InfoAgenda = ({ data }: InfoAgendaProps) => {
  const items: KeyValueItem[] = [];

  if ('usuario' in data) {
    items.push(
      { key: 'Especialidad', value: data.especialidad },
      { key: 'Tipo', value: data.tipo },
      { key: 'Atención', value: data.atencion },
      { key: 'Atendiendo en', value: data.atendiendoEn },
    );

    if (data.horaInicio)
      items.push({
        key: 'Hora de inicio',
        value: data.horaInicio + ' (' + data.usuario + ')',
      });

    if (data.horaCierre) {
      const value = `${data.horaCierre} (Est. ${data.faltan})`;
      items.push({
        key: 'Hora de cierre',
        value: value,
        color: value.includes('-') ? '#ffa800' : '',
      });
    }
  } else {
    items.push({ key: 'Especialidad', value: data.especialidad }, { key: 'Atendiendo en', value: data.atendiendoEn });

    if (data.horaInicio)
      items.push({
        key: 'Hora de inicio',
        value: data.horaInicio,
      });

    if (data.horaCierre)
      items.push({
        key: 'Hora de cierre',
        value: data.horaCierre,
      });
  }

  return (
    <Card title={'Resonador Ingenia 1.5'} paddingY={8}>
      <TextGroup list={items}></TextGroup>
    </Card>
  );
};

export default InfoAgenda;
