'use client';

import { calcularHoraActual } from '@/api/mappers';
import MainLayout from '@/app/MainLayout';
import Label from '@/components/Label';
import { SubContent } from '@/components/layout';
import Table from '@/components/Table';
import TableFilterInput from '@/components/TableFilterInput';
import TopBar from '@/components/TopBar';
import { useListAgendasActivas } from '@/hooks/useListAgendasActivas';
import { formatTime, localeIncludes } from '@/utils';
import { useMemo, useState } from 'react';
import Acciones from './Acciones';
import ProgresoAgenda from './ProgresoAgenda';

const Checkmark = ({ checked }: { checked: boolean }) => (checked ? <>&#x2714;</> : <></>);

const AgendasActivas = () => {
  const { data: agendasActivas } = useListAgendasActivas();
  const [searchTerm, setSearchTerma] = useState('');

  // Filtrar las agendas por el valor del filtro
  const filteredAgendasActivas = useMemo(
    () =>
      agendasActivas?.filter(
        (item) =>
          localeIncludes(item.usuarioNombreApellido || '', searchTerm) ||
          localeIncludes(item.especialidadDescripcion || '', searchTerm),
      ) ?? [],
    [agendasActivas, searchTerm],
  );

  return (
    <MainLayout>
      <TopBar title="Agendas activas" />
      <SubContent>
        <Table
          headers={[
            { title: 'Médico/Equipo', value: 'usuarioNombreApellido' },
            { title: 'Especialidad', value: 'especialidadDescripcion' },
            { title: 'Atiende hoy', align: 'center', renderer: () => <Checkmark checked={true} /> },
            {
              title: 'Atendiendo en',
              align: 'center',
              renderer: ({ consultorioDescripcion }) =>
                consultorioDescripcion ? <Label>{consultorioDescripcion}</Label> : <></>,
            },
            {
              title: 'Entrada',
              align: 'center',
              renderer: (agenda) => {
                const horarioActual = calcularHoraActual(agenda?.entradaSalidaDtos, agenda?.horarioDetalleDtos);
                if (!horarioActual) return <></>;
                return <>{formatTime(horarioActual.horaEntrada)}</>;
              },
            },
            {
              title: 'Salida',
              align: 'center',
              renderer: (agenda) => {
                const horarioActual = calcularHoraActual(agenda?.entradaSalidaDtos, agenda?.horarioDetalleDtos);
                if (!horarioActual) return <></>;
                return <>{formatTime(horarioActual.horaSalida)}</>;
              },
            },
            {
              title: 'Demora',
              align: 'center',
              renderer: ({ calculoDemora }) => (calculoDemora ? <>{`${calculoDemora} min`}</> : <></>),
            },
            {
              title: 'Progreso',
              align: 'center',
              renderer: ({ cantidadAtendidos = 0, cantidadPresentes = 0, cantidadSinLlegar = 0 }) => (
                <ProgresoAgenda
                  atendidos={cantidadAtendidos}
                  presentes={cantidadPresentes}
                  sinLlegar={cantidadSinLlegar}
                />
              ),
            },
            {
              title: <TableFilterInput value={searchTerm} onChange={(value) => setSearchTerma(value)} />,
              align: 'right',
              renderer: (agenda) => <Acciones agenda={agenda} />,
            },
          ]}
          items={filteredAgendasActivas}
        />
      </SubContent>
    </MainLayout>
  );
};

export default AgendasActivas;
