'use client';

import MainLayout from '@/app/MainLayout';
import Button from '@/components/Button';
import Calendar from '@/components/Calendar';
import { LeftBar, MainContainer, SubContent } from '@/components/layout';
import StateLabel from '@/components/StateComponent';
import Table from '@/components/Table';
import TableFilterInput from '@/components/TableFilterInput';
import TimeLabel from '@/components/TimeLabel';
import TopBar from '@/components/TopBar';
import TurnosDelDia from '@/components/TurnosDelDiaComponent';
import UrgentLabel from '@/components/UrgentLabelComponent';
import { useListFechasConTurnos } from '@/hooks/useListFechasConTurnos';
import { AgendaDiaTurno, useListVistaAgendaDiaAdm } from '@/hooks/useListVistaAgendaDia';
import CajaIcon from '@/icons/CajaIcon';
import CancelarTurnoColoredIcon from '@/icons/CancelarTurnoColoredIcon';
import CandadoBloqueadoIcon from '@/icons/CandadoBloqueadoIcon';
import CerrarIcon from '@/icons/CerrarIcon';
import ComentarioIcon from '@/icons/ComentarioIcon';
import ConfiguracionIcon from '@/icons/ConfiguracionIcon';
import IndividuoIcon from '@/icons/IndividuoIcon';
import InformacionIcon from '@/icons/InformacionIcon';
import InformeIcon from '@/icons/InformeIcon';
import MenuContextualIcon from '@/icons/MenuContextualIcon';
import NoAtendidasColoredIcon from '@/icons/NoAtendidasColoredIcon';
import NuevoTurnoIcon from '@/icons/NuevoTurnoIcon';
import PacientesIcon from '@/icons/PacientesIcon';
import RefrescarIcon from '@/icons/RefrescarIcon';
import { TurnoEstado } from '@/types/api';
import { localeIncludes } from '@/utils';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import BotonAccion from '../BotonAccion';
import Demora from '../Demora';
import InfoAgenda from '../InfoAgenda';
import InfoTurnoPanel from '../InfoTurnoPanel';
import styles from './page.module.css';

const ButtonsGroup = () => {
  return (
    <div className={styles.buttonGroup}>
      <Button variant="outline" size="lg" icon={NuevoTurnoIcon} />
      <Button variant="outline" size="lg" icon={CancelarTurnoColoredIcon} />
      <Button variant="outline" size="lg" icon={PacientesIcon} />
      <Button variant="outline" size="lg" icon={NoAtendidasColoredIcon} />
      <Button variant="outline" size="lg" icon={CajaIcon} />
      <Button variant="outline" size="lg" icon={InformeIcon} />
      <Button variant="outline" size="lg" icon={ConfiguracionIcon} />
    </div>
  );
};

export interface ButtonsGroup2Props {
  estado: TurnoEstado;
  onInfoClick: () => void;
  width?: number;
}

const estadosSinAcciones = ['Vacío', 'Bloqueado'];
const estadosCancelables = ['Asignado', 'Confirmado'];

const ButtonsGroup2 = ({ estado, onInfoClick }: ButtonsGroup2Props) => {
  return (
    <div className={styles.buttonGroup2}>
      {!estadosSinAcciones.includes(estado) && (
        <>
          <Button variant="outline" size="sm" icon={InformacionIcon} onClick={onInfoClick} />
          <Button variant="outline" size="sm" icon={IndividuoIcon} />
          <Button variant="outline" size="sm" icon={ComentarioIcon} />
          <Button variant="outline" size="sm" icon={RefrescarIcon} disabled={estadosCancelables.includes(estado)} />
          <Button
            variant="outline"
            color={estadosCancelables.includes(estado) ? 'negative' : 'default'}
            size="sm"
            icon={CerrarIcon}
            disabled={!estadosCancelables.includes(estado)}
          />
        </>
      )}
      <BotonAccion estado={estado} />
      <Button variant="flat" size="sm" icon={MenuContextualIcon}></Button>
    </div>
  );
};

const DailyAgendaAdm = () => {
  const params = useParams();
  const id = String(params.id);
  const [date, setDate] = useState<Date>();
  const { infoAgenda, turnosTotalizados, turnos, espera } = useListVistaAgendaDiaAdm(id, date);
  const { fechasConTurnos } = useListFechasConTurnos(id);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState<AgendaDiaTurno>();
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar los turnos por el valor del filtro
  const filteredTurnos = useMemo(
    () => turnos?.filter((item) => localeIncludes(item.paciente, searchTerm)) ?? [],
    [turnos, searchTerm],
  );

  return (
    <MainLayout>
      <TopBar title="Agenda del dia" />
      <SubContent>
        <LeftBar>
          <InfoAgenda data={infoAgenda} />
          <ButtonsGroup />
          <Calendar onUpdate={setDate} points={fechasConTurnos} />
          <TurnosDelDia values={turnosTotalizados} />
          <Demora value={espera} />
        </LeftBar>
        <MainContainer>
          <Table
            headers={[
              { title: '' },
              { title: 'Hora' },
              { title: '' },
              { title: 'Paciente' },
              { title: 'Obra Social' },
              { title: 'Plan' },
              { title: 'Tipo' },
              { title: 'ID de turno' },
              { title: 'Estado' },
              {
                title: <TableFilterInput value={searchTerm} onChange={(value) => setSearchTerm(value)} />,
                align: 'right',
              },
            ]}
          >
            {filteredTurnos.map((item, index) => {
              const estilos = clsx(styles[item.estado], {
                [styles.Urgente]: item.urgente,
                [styles.TurnoNormal]:
                  (infoAgenda.usaMinutosDinamicos && item.minutos <= 25) || !infoAgenda.usaMinutosDinamicos,
                [styles.TurnoDoble]: infoAgenda.usaMinutosDinamicos && item.minutos > 25 && item.minutos <= 50,
                [styles.TurnoTriple]: infoAgenda.usaMinutosDinamicos && item.minutos > 50,
              });

              return (
                <tr key={index} className={estilos}>
                  <td>
                    <UrgentLabel urgente={item.urgente} />
                  </td>
                  <td>
                    <TimeLabel time={item.hora} />
                  </td>
                  {item.bloqueado ? (
                    <>
                      <td>
                        <CandadoBloqueadoIcon color="white" />
                      </td>
                      <td colSpan={2}>
                        <strong>Turno bloqueado:</strong> {`"${item.motivoBloqueo}"`}
                      </td>
                      <td></td>
                    </>
                  ) : (
                    <>
                      <td></td>
                      <td>{item.paciente}</td>
                      <td>{item.obraSocial}</td>
                      <td>{item.plan}</td>
                    </>
                  )}
                  <td>{item.tipo}</td>
                  <td>{item.idTurno}</td>
                  <td>
                    <StateLabel idEstado={item.idEstado} estadoNombre={item.estado} />
                  </td>
                  <td>
                    <ButtonsGroup2
                      estado={item.estado}
                      onInfoClick={() => {
                        setTurnoSeleccionado(item);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </Table>
        </MainContainer>
      </SubContent>

      <InfoTurnoPanel turno={turnoSeleccionado} onClose={() => setTurnoSeleccionado(undefined)}></InfoTurnoPanel>
    </MainLayout>
  );
};

export default DailyAgendaAdm;
