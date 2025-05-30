import StateLabel from '@/components/StateComponent';
import { AgendaDiaTurno } from '@/hooks/useListVistaAgendaDia';
import AgregarIcon from '@/icons/AgregarIcon';
import InformacionIcon from '@/icons/InformacionIcon';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Banner from '../../../components/Banner';
import Button from '../../../components/Button';
import Caja from '../../../components/Caja';
import Panel, { PanelRef } from '../../../components/Panel';
import TextGroup from '../../../components/TextGroup';
import styles from './InfoTurnoPanel.module.css';

interface InfoTurnoPanelProps {
  turno?: AgendaDiaTurno;
  onClose: () => void;
}

const InfoTurnoPanel = ({ turno, onClose: toClose }: InfoTurnoPanelProps) => {
  const panelRef = useRef<PanelRef>(null);
  // TODO: recuperar la info a mostrar, desde turno.idTurno
  console.log('buscamos la info del turno:', turno?.idTurno);

  useEffect(() => {
    if (turno) {
      panelRef.current?.open();
    } else {
      panelRef.current?.close();
    }
  }, [turno]);

  return (
    <Panel
      ref={panelRef}
      header={
        <>
          <span>
            <InformacionIcon color="white" size={25} />
          </span>
          <span className={styles.title}>Información del turno</span>
        </>
      }
      footer={
        <>
          <Button variant="outline" size="md" shape="round" icon={AgregarIcon} onClick={toClose}>
            Volver
          </Button>
          <Button size="md" shape="round" icon={AgregarIcon}>
            Llamar
          </Button>
          <Button size="md" shape="round" icon={AgregarIcon}>
            Atender
          </Button>
        </>
      }
    >
      <div className={styles.content}>
        <Banner type="success">El llamado al paciente se realizó exitosamente</Banner>
        <div>
          <Caja>
            <TextGroup
              list={[
                { key: 'Nombre', value: 'García Miguel Ángel' },
                { key: 'Edad', value: '32 años' },
                { key: 'Sexo', value: 'Masculino' },
              ]}
            />
          </Caja>
        </div>
        <div className={styles.row}>
          <div>
            <Caja titulo="Prestaciones del turno">
              <ul>
                <li>Ecografía tiróidea</li>
                <li>Ecografía de cadera</li>
              </ul>
            </Caja>
          </div>
          <div>
            <Image
              className={styles.imagenEstudio}
              width={600}
              height={400}
              src="https://placehold.co/600x400/EEE/31343C/png"
              alt="Imagen del estudio"
            />
          </div>
        </div>
        <div>
          <Caja titulo="Turnos del día">
            <table className={styles.proximosTurnos}>
              <tbody>
                <tr>
                  <td>10:10</td>
                  <td>Resonador 1</td>
                  <td>Consultorio 112</td>
                  <td>
                    <StateLabel idEstado={3} estadoNombre="Atendiendo" />
                  </td>
                  <td>
                    <AgregarIcon />
                  </td>
                </tr>
                <tr>
                  <td>10:35</td>
                  <td>Ecografía</td>
                  <td>Consultorio 201</td>
                  <td>
                    <StateLabel idEstado={4} estadoNombre="Presente" />
                  </td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>10:40</td>
                  <td>Doppler cardíaco</td>
                  <td>Consultorio 201</td>
                  <td>
                    <StateLabel idEstado={4} estadoNombre="Presente" />
                  </td>
                  <td>&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </Caja>
        </div>
      </div>
    </Panel>
  );
};

export default InfoTurnoPanel;
