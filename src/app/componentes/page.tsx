'use client';

import MainLayout from '@/app/MainLayout';
import Banner from '@/components/Banner';
import Button, { ButtonProps } from '@/components/Button';
import Caja from '@/components/Caja';
import Calendar from '@/components/Calendar';
import Card from '@/components/Card';
import DropdownComponent from '@/components/Dropdown';
import Input from '@/components/Input';
import Label from '@/components/Label';
import Modal, { ModalRef } from '@/components/Modal';
import Panel, { PanelRef } from '@/components/Panel';
import Select from '@/components/Select';
import TopBar from '@/components/TopBar';
import AgendaIcon from '@/icons/AgendaIcon';
import AgregarIcon from '@/icons/AgregarIcon';
import AperturaConsultorioIcon from '@/icons/AperturaConsultorioIcon';
import AppleIcon from '@/icons/AppleIcon';
import BuscarIcon from '@/icons/BuscarIcon';
import CajaIcon from '@/icons/CajaIcon';
import CampanaIcon from '@/icons/CampanaIcon';
import CancelarTurnoColoredIcon from '@/icons/CancelarTurnoColoredIcon';
import CancelarTurnoIcon from '@/icons/CancelarTurnoIcon';
import CandadoBloqueadoIcon from '@/icons/CandadoBloqueadoIcon';
import CandadoDesbloqueadoIcon from '@/icons/CandadoDesbloqueadoIcon';
import CerrarIcon from '@/icons/CerrarIcon';
import CierreConsultorioIcon from '@/icons/CierreConsultorioIcon';
import ComentarioIcon from '@/icons/ComentarioIcon';
import ConfiguracionIcon from '@/icons/ConfiguracionIcon';
import DashboardIcon from '@/icons/DashboardIcon';
import EditarIcon from '@/icons/EditarIcon';
import EliminarIcon from '@/icons/EliminarIcon';
import FacebookIcon from '@/icons/FacebookIcon';
import FiltrosIcon from '@/icons/FiltrosIcon';
import GoogleIcon from '@/icons/GoogleIcon';
import IndividuoIcon from '@/icons/IndividuoIcon';
import InformacionIcon from '@/icons/InformacionIcon';
import InformeIcon from '@/icons/InformeIcon';
import IngresarIcon from '@/icons/IngresarIcon';
import MenuContextualIcon from '@/icons/MenuContextualIcon';
import NoAtendidasColoredIcon from '@/icons/NoAtendidasColoredIcon';
import NoAtendidasIcon from '@/icons/NoAtendidasIcon';
import NotificacionesIcon from '@/icons/NotificacionesIcon';
import NuevoTurnoIcon from '@/icons/NuevoTurnoIcon';
import PacientesIcon from '@/icons/PacientesIcon';
import ParametrizacionIcon from '@/icons/ParametrizacionIcon';
import PerfilUsuarioIcon from '@/icons/PerfilUsuarioIcon';
import PreguntasFrecuentesIcon from '@/icons/PreguntasFrecuentesIcon';
import RefrescarIcon from '@/icons/RefrescarIcon';
import UrgenteIcon from '@/icons/UrgenteIcon';
import VisualizarIcon from '@/icons/VisualizarIcon';
import clsx from 'clsx';
import { useRef } from 'react';
import styles from './page.module.css';

const buttonCombinations = ['sm', 'md', 'lg'].flatMap((size) =>
  ['default', 'negative', 'positive'].flatMap((color) =>
    ['square', 'round'].flatMap((shape) =>
      [null, 'Texto'].flatMap((children) =>
        [NotificacionesIcon, null].flatMap((icon) =>
          ['primary', 'secondary', 'outline', 'flat', 'flat-inverted'].flatMap((variant) =>
            icon || children ? ({ icon, size, variant, shape, color, children } as ButtonProps) : [],
          ),
        ),
      ),
    ),
  ),
);

const iconSize = 24;

const Componentes = () => {
  const modalRef = useRef<ModalRef>(null);
  const panelRef = useRef<PanelRef>(null);

  return (
    <MainLayout>
      <TopBar title="Catálogo de componentes" />
      <h2 className={styles.title}>Banner</h2>
      <div className={styles.section}>
        <Banner type="success">Esto es un banner</Banner>
      </div>
      <h2 className={styles.title}>Button</h2>
      <div className={styles.section}>Hover sobre los botones para ver props</div>
      <div className={styles.buttons}>
        {buttonCombinations.map((props, i) => (
          <div key={`button-${i}`} className={clsx({ [styles.darkBackground]: props.variant === 'flat-inverted' })}>
            <Button {...props} title={JSON.stringify(props, null, 2)} />
          </div>
        ))}
      </div>
      <h2 className={styles.title}>Caja</h2>
      <div className={styles.section}>
        <Caja titulo="Título de la caja">
          <div>Contenido de la caja</div>
        </Caja>
      </div>
      <h2 className={styles.title}>Calendar</h2>
      <div className={styles.section}>
        <Calendar
          points={[]}
          onUpdate={(value) => {
            console.log('Calendar updated', value);
          }}
        />
      </div>
      <h2 className={styles.title}>Card</h2>
      <div className={styles.section}>
        <Card title="Título de la tarjeta" variant="filled">
          <div className={styles.cardContent}>
            <h3>Título de la tarjeta</h3>
            <p>Contenido de la tarjeta</p>
          </div>
        </Card>
        <Card title="Título de la tarjeta" variant="flat">
          <div className={styles.cardContent}>
            <h3>Título de la tarjeta</h3>
            <p>Contenido de la tarjeta</p>
          </div>
        </Card>
      </div>
      <h2 className={styles.title}>Dropdown</h2>
      <div className={styles.section}>
        <DropdownComponent
          style={{ width: '200px' }}
          options={[
            { value: 1, label: 'Primera opción' },
            { value: 2, label: 'Segunda opción' },
            { value: 3, label: 'Tercera opción' },
          ]}
        />
      </div>
      <h2 className={styles.title}>Input</h2>
      <div className={styles.section}>
        <Input placeholder="Placeholder" variantSize="sm" />
        <Input placeholder="Placeholder" variantSize="md" />
        <Input placeholder="Placeholder" variantSize="lg" />
      </div>
      <h2 className={styles.title}>Label</h2>
      <div className={styles.section}>
        <Label>Texto de la etiqueta</Label>
      </div>
      <h2 className={styles.title}>Modal</h2>
      <div className={styles.section}>
        <Button onClick={() => modalRef.current?.open()}>Abrir Modal</Button>
        <Modal ref={modalRef} title="Título del modal">
          <div>Contenido del modal</div>
          <Button onClick={() => modalRef.current?.close()}>Cerrar</Button>
        </Modal>
      </div>
      <h2 className={styles.title}>Panel</h2>
      <div className={styles.section}>
        <Button onClick={() => panelRef.current?.open()}>Abrir Panel</Button>
        <Panel
          ref={panelRef}
          header="Título del modal"
          footer={<Button onClick={() => panelRef.current?.close()}>Cerrar</Button>}
        >
          <div>Contenido del panel</div>
        </Panel>
      </div>
      <h2 className={styles.title}>Select</h2>
      <div className={styles.section}>
        <Select>
          <option value="1">Primera opción</option>
          <option value="2">Segunda opción</option>
          <option value="3">Tercera opción</option>
        </Select>
      </div>
      <h2 className={styles.title}>Icons</h2>
      <div className={styles.icons}>
        <div>
          <AgendaIcon size={iconSize} /> AgendaIcon
        </div>
        <div>
          <AgregarIcon size={iconSize} /> AgregarIcon
        </div>
        <div>
          <AperturaConsultorioIcon size={iconSize} /> AperturaConsultorioIcon
        </div>
        <div>
          <AppleIcon size={iconSize} /> AppleIcon
        </div>
        <div>
          <BuscarIcon size={iconSize} /> BuscarIcon
        </div>
        <div>
          <CajaIcon size={iconSize} /> CajaIcon
        </div>
        <div>
          <CampanaIcon size={iconSize} /> CampanaIcon
        </div>
        <div>
          <CancelarTurnoColoredIcon size={iconSize} /> CancelarTurnoColoredIcon
        </div>
        <div>
          <CancelarTurnoIcon size={iconSize} /> CancelarTurnoIcon
        </div>
        <div>
          <CandadoBloqueadoIcon size={iconSize} /> CandadoBloqueadoIcon
        </div>
        <div>
          <CandadoDesbloqueadoIcon size={iconSize} /> CandadoDesbloqueadoIcon
        </div>
        <div>
          <CerrarIcon size={iconSize} /> CerrarIcon
        </div>
        <div>
          <CierreConsultorioIcon size={iconSize} /> CierreConsultorioIcon
        </div>
        <div>
          <ComentarioIcon size={iconSize} /> ComentarioIcon
        </div>
        <div>
          <ConfiguracionIcon size={iconSize} /> ConfiguracionIcon
        </div>
        <div>
          <DashboardIcon size={iconSize} /> DashboardIcon
        </div>
        <div>
          <EditarIcon size={iconSize} /> EditarIcon
        </div>
        <div>
          <EliminarIcon size={iconSize} /> EliminarIcon
        </div>
        <div>
          <FacebookIcon size={iconSize} /> FacebookIcon
        </div>
        <div>
          <FiltrosIcon size={iconSize} /> FiltrosIcon
        </div>
        <div>
          <GoogleIcon size={iconSize} /> GoogleIcon
        </div>
        <div>
          <IndividuoIcon size={iconSize} /> IndividuoIcon
        </div>
        <div>
          <InformacionIcon size={iconSize} /> InformacionIcon
        </div>
        <div>
          <InformeIcon size={iconSize} /> InformeIcon
        </div>
        <div>
          <IngresarIcon size={iconSize} /> IngresarIcon
        </div>
        <div>
          <MenuContextualIcon size={iconSize} /> MenuContextualIcon
        </div>
        <div>
          <NoAtendidasColoredIcon size={iconSize} /> NoAtendidasColoredIcon
        </div>
        <div>
          <NoAtendidasIcon size={iconSize} /> NoAtendidasIcon
        </div>
        <div>
          <NotificacionesIcon size={iconSize} /> NotificacionesIcon
        </div>
        <div>
          <NotificacionesIcon size={iconSize} alert /> NotificacionesIcon (con alerta)
        </div>
        <div>
          <NuevoTurnoIcon size={iconSize} /> NuevoTurnoIcon
        </div>
        <div>
          <PacientesIcon size={iconSize} /> PacientesIcon
        </div>
        <div>
          <ParametrizacionIcon size={iconSize} /> ParametrizacionIcon
        </div>
        <div>
          <PerfilUsuarioIcon size={iconSize} /> PerfilUsuarioIcon
        </div>
        <div>
          <PreguntasFrecuentesIcon size={iconSize} /> PreguntasFrecuentesIcon
        </div>
        <div>
          <RefrescarIcon size={iconSize} /> RefrescarIcon
        </div>
        <div>
          <UrgenteIcon size={iconSize} /> UrgenteIcon
        </div>
        <div>
          <VisualizarIcon size={iconSize} /> VisualizarIcon
        </div>
      </div>
    </MainLayout>
  );
};

export default Componentes;
