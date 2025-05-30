'use client';

import MainLayout from '@/app/MainLayout';
import Calendar from '@/components/Calendar';
import { LeftBar, MainContainer, SubContent } from '@/components/layout';
import Table from '@/components/Table';
import TopBar from '@/components/TopBar';
import TurnosDelDia from '@/components/TurnosDelDiaComponent';
import { useListVistaAgendaDiaMed } from '@/hooks/useListVistaAgendaDia';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Demora from '../Demora';
import InfoAgenda from '../InfoAgenda';
import NextPatient from '../NextPatient';

const DailyAgendaMed = () => {
  const params = useParams();
  const id = String(params.id);
  const [date, setDate] = useState<Date>();
  const { infoAgenda, turnosTotalizados, turnos } = useListVistaAgendaDiaMed(id, date);

  return (
    <MainLayout>
      <TopBar title="Agenda del dia" />
      <SubContent>
        <LeftBar>
          <InfoAgenda data={infoAgenda} />
          <NextPatient />
          <Calendar onUpdate={setDate} points={[]} />
          <TurnosDelDia values={turnosTotalizados} />
          <Demora value={35} />
        </LeftBar>
        <MainContainer>
          <Table
            headers={[
              { title: 'Hora', value: 'hora' },
              { title: 'Paciente', value: 'paciente' },
              { title: 'Obra Social', value: 'obraSocial' },
              { title: 'Plan', value: 'plan' },
              { title: 'Tipo', value: 'tipo' },
              { title: 'ID de turno', value: 'idTurno' },
              { title: 'Estado', value: 'estado' },
            ]}
            items={turnos || []}
          ></Table>
        </MainContainer>
      </SubContent>
    </MainLayout>
  );
};

export default DailyAgendaMed;
