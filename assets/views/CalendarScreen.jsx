import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import CalendarHeader from '../components/calendarScreen/CenterCalendar';
import styles from '../styles/stylesCalendar';
import axios from 'axios';
import { Platform } from 'react-native';
import moment from 'moment';

function MyCalendar(props) {
  let baseURL;
  if (Platform.OS === 'web') {
    baseURL = 'http://localhost:3000';
  } else {
    baseURL =
      Platform.OS === 'android'
        ? 'http://10.0.2.2:3000'
        : 'http://tu_direccion_de_servidor:3000';
  }

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const API_URL = `${baseURL}/api/tasks`;
  const API_URLP = `${baseURL}/api/projects`;

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        if (response.status === 200) {
          setTasks(response.data);
          console.log('-----------------------');
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(API_URLP)
      .then((response) => {
        if (response.status === 200) {
          setProjects(response.data);
          console.log('++++++++++++++++');
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error.message);
      });
  }, []);

  const eventos = [];
  const marked = {};

  // Procesar las tareas
  tasks.forEach((task) => {
    // Agrega las propiedades necesarias a cada evento
    const evento = {
      title: task.titulo,
      start: moment(task.fecha).format('YYYY-MM-DD'),
      end: moment(task.fecha).format('YYYY-MM-DD'),
      allDay: true, // Opción 'allDay' para todos los eventos
      description: task.descripcion,
      color: '#B781FB',
      textColor: 'black',
      type: 'task',
      id: task._id,
    };
    eventos.push(evento);

    // Construye el objeto 'marked' basado en la fecha del evento
    const fecha = task.fecha.substr(0, 10);
    if (!marked[fecha]) {
      marked[fecha] = { marked: true, dots: [] };
    }
    marked[fecha].dots.push({ color: evento.color });
  });

  // Procesar los proyectos
  projects.forEach((project) => {
    // Agrega las propiedades necesarias a cada evento de proyecto
    const projectEvento = {
      title: project.titulo,
      start: moment(project.fecha_inicio).format('YYYY-MM-DD'),
      end: moment(project.fecha_fin).format('YYYY-MM-DD'),
      allDay: true,
      description: project.descripcion,
      color: '#1ABCFE', // Color específico para proyectos
      textColor: 'black',
      type: 'project', // Tipo específico para proyectos
      id: project._id,
    };
    eventos.push(projectEvento);
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedEventType, setSelectedEventType] = useState(null);

  const closeModal = () => {
    setModalVisible(false);
  };

  const dayCustomStyle = (date) => {
    const dots = marked[date]?.dots || [];
    let backgroundColor = 'transparent';

    if (dots.length === 1) {
      backgroundColor = dots[0].color;
    } else if (dots.length > 1) {
      backgroundColor = 'yellow'; // Cambiar el color a verde para múltiples eventos
    }

    return {
      container: {
        backgroundColor,
        borderRadius: 5,
        height: 36, // Ajustar el tamaño del círculo
        width: 36, // Ajustar el tamaño del círculo
        justifyContent: 'center',
        alignItems: 'center',
      },
    };
  };

  const openModal = (events, eventType) => {
    console.log('Eventos para abrir el modal:', events);
    
    setSelectedEvents(events);
    setSelectedEventType(eventType);
    setModalVisible(true);
  };

  return (
    <>
      <Calendar
        current={'2023-10-01'}
        minDate={'2023-10-01'}
        maxDate={'2024-10-31'}
        style={{ margin: 20, borderRadius: 10 }}
        disableAllTouchEventsForDisabledDays={true}
        markedDates={marked}
        dayComponent={({ date }) => (
          <TouchableOpacity
            style={[
              styles.dayContainer,
              dayCustomStyle(date.dateString).container,
            ]}
            onPress={() => {
              const events = eventos.filter((e) => e.start === date.dateString);
              console.log('Eventos para la fecha', date.dateString, ':', events);
              if (events.length > 0) {
                openModal(events, events[0].type);
              }
            }}
          >
            <Text style={[
              styles.dayText,
              dayCustomStyle(date.dateString).text,
            ]}>
              {date.day}
            </Text>
          </TouchableOpacity>
        )}
        {...props}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                {selectedEvents.length > 1 ? (
                  // Mostrar solo título y fecha de finalización cuando hay múltiples eventos
                  selectedEvents.map((event) => {
                    const backgroundColor = event.color;
                    return (
                      <View
                        key={event.id}
                        style={{
                          backgroundColor,
                          marginTop: 10,
                          padding: 5,
                          borderRadius: 5,
                        }}
                      >
                        <Text style={styles.modalTitle}>{event.title}</Text>
                        <Text style={{ fontSize: 15 }}>
                          Fecha de Finalización: {event.end}
                        </Text>
                      </View>
                    );
                  })
                ) : (
                  // Mostrar detalles completos cuando hay un solo evento o eventos de diferentes tipos
                  selectedEvents.map((event) => {
                    const backgroundColor = event.color;
                    return (
                      <View key={event.id}>
                        <Text style={styles.modalTitle}>{event.title}</Text>
                        <Text style={{ fontSize: 15 }}>Fecha: {event.start}</Text>
                        <Text style={styles.h3}>Descripción</Text>
                        <Text style={styles.modalDescription}>{event.description}</Text>
                        {event.type === 'project' && (
                          <>
                            <View>
                              <Text style={styles.h3}>Por Hacer</Text>
                              <View style={styles.targTask}>
                                <Text style={{ color: '#5969FF', fontSize: 15 }}>
                                  Titulo Tarea
                                </Text>
                                <Text>Responsable Tarea</Text>
                              </View>
                            </View>
                            <View>
                              <Text style={styles.h3}>En Progreso</Text>
                              <View style={styles.targTask}>
                                <Text style={{ color: '#5969FF', fontSize: 15 }}>
                                  Titulo Tarea
                                </Text>
                                <Text>Responsable Tarea</Text>
                              </View>
                            </View>
                            <View>
                              <Text style={styles.h3}>Hecho</Text>
                              <View style={styles.targTask}>
                                <Text style={{ color: '#5969FF', fontSize: 15 }}>
                                  Titulo Tarea
                                </Text>
                                <Text>Responsable Tarea</Text>
                              </View>
                              <View style={styles.targTask}>
                                <Text style={{ color: '#5969FF', fontSize: 15 }}>
                                  Titulo Tarea
                                </Text>
                                <Text>Responsable Tarea</Text>
                              </View>
                              <View style={styles.targTask}>
                                <Text style={{ color: '#5969FF', fontSize: 15 }}>
                                  Titulo Tarea
                                </Text>
                                <Text>Responsable Tarea</Text>
                              </View>
                            </View>
                          </>
                        )}
                      </View>
                    );
                  })
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      <CalendarHeader />
      <MyCalendar />
    </View>
  );
};

export default CalendarScreen;
