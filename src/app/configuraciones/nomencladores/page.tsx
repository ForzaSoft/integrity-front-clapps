'use client';

import MainLayout from '@/app/MainLayout';
import { SubContent } from '@/components/layout';
import TopBar from '@/components/TopBar';
import ParametrizacionIcon from '@/icons/ParametrizacionIcon';
import Link from 'next/link';
import NomencladoresTable from './NomencladoresTable';
import styles from './page.module.css';

const NomencladoresPage = () => {
  return (
    <MainLayout
      leftPanel={
        <div className={styles.leftPanel}>
          <div className={styles.leftPanelTitle}>
            <ParametrizacionIcon size={24} />
            <span>Configuración General</span>
          </div>
          <div className={styles.leftPanelContent}>
            <ul>
              <li>
                Agendas
                <ul>
                  <li>Médicos/Equipos</li>
                </ul>
              </li>
              <li>
                Avanzado
                <ul>
                  <li>Configuración maestra</li>
                  <li>Empresa</li>
                </ul>
              </li>
              <li>
                Básica
                <ul>
                  <li className={styles.selected}>
                    <Link href="/configuraciones/nomencladores">Códigos de nomenclador</Link>
                  </li>
                  <li>Consentimientos</li>
                  <li>Discapacidades</li>
                  <li>Especialidades</li>
                  <li>Mails</li>
                  <li>Mensajes</li>
                  <li>Modalidades</li>
                  <li>Prestaciones médicas</li>
                </ul>
              </li>
              <li>
                Cajas
                <ul>
                  <li>Aperturas programadas de caja</li>
                  <li>Cajas diarias</li>
                  <li>Cajas maestras</li>
                  <li>Depositos</li>
                  <li>Derechos sobre cajas</li>
                </ul>
              </li>

              <li>
                Estructura
                <ul>
                  <li>Centros</li>
                  <li>Consultorios</li>
                  <li>Equipos</li>
                  <li>Llamadores</li>
                  <li>Pisos</li>
                  <li>Recepciones</li>
                  <li>Vestidores</li>
                </ul>
              </li>

              <li>
                Informes
                <ul>
                  <li>Templates de informes</li>
                  <li>Tipos y subtipos de informe</li>
                  <li>Reglas de distribución de informes</li>
                  <li>Reglas de firmas de informes</li>
                </ul>
              </li>

              <li>
                Obras Sociales
                <ul>
                  <li>Obras Sociales</li>
                  <li>Mapeos</li>
                  <li>Reglas de liquidación</li>
                  <li>Reglas de Facturación</li>
                  <li>Restricciones de búsqueda</li>
                  <li>Validadores</li>
                </ul>
              </li>

              <li>
                Regionales
                <ul>
                  <li>Feriados</li>
                  <li>Localidades</li>
                  <li>Paises</li>
                  <li>Provincias</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      }
    >
      <TopBar title="Códigos de nomenclador" />
      <SubContent>
        <NomencladoresTable />
      </SubContent>
    </MainLayout>
  );
};

export default NomencladoresPage;
