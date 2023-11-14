import React, { useState, useEffect } from 'react';
import {
  ScrollView,
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
  const [dependenceTasks, setDapendenceTasks] = useState([]);
  const [tareasPorProyecto, setTareasPorProyecto] = useState({});

  const API_URL = `${baseURL}/api/tasks`;
  const API_URLP = `${baseURL}/api/projects`;
  const API_URLDP = `${baseURL}/api/dependent_tasks`;

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        if (response.status === 200) {
          setTasks(response.data);
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
        }
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error.message);
      });
  }, []);

  useEffect(() => {
    axios.get(API_URLDP)
      .then(response => {
        if (response.status === 200) {
          setDapendenceTasks(response.data);
        }
      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
      });
  }, []);

  useEffect(() => {
    const tareasPorProyecto = {};
    projects.forEach((project) => {
      if (project.fecha_inicio) {
        if (!tareasPorProyecto[project._id]) {
          tareasPorProyecto[project._id] = {
            projectData: project,
            tareas: {
              "Por hacer": [],
              "En progreso": [],
              "Hecho": [],
            },
          };
        }
      }
    });

    dependenceTasks.forEach((task) => {
      const proyectoId = task.proyecto_id;
      const estado = task.estatus;
      if (tareasPorProyecto[proyectoId] && tareasPorProyecto[proyectoId].tareas[estado]) {
        tareasPorProyecto[proyectoId].tareas[estado].push(task);
      }
    });

    setTareasPorProyecto(tareasPorProyecto);
  }, [projects, dependenceTasks]);

  const eventos = [];
  const marked = {};

  tasks.forEach((task) => {
    const evento = {
      title: task.titulo,
      start: moment(task.fecha).format('YYYY-MM-DD'),
      end: moment(task.fecha).format('YYYY-MM-DD'),
      allDay: true,
      description: task.descripcion,
      color: '#B781FB',
      textColor: 'black',
      type: 'task',
      id: task._id,
    };
    eventos.push(evento);

    const fecha = task.fecha.substr(0, 10);
    if (!marked[fecha]) {
      marked[fecha] = { marked: true, dots: [] };
    }
    marked[fecha].dots.push({ color: evento.color });
  });

  projects.forEach((project) => {
    if (project.fecha_inicio) {
      const projectEvento = {
        title: project.titulo,
        start: moment(project.fecha_inicio).format('YYYY-MM-DD'),
        end: moment(project.fecha_fin).format('YYYY-MM-DD'),
        allDay: true,
        description: project.descripcion,
        color: '#1ABCFE',
        textColor: 'black',
        type: 'project',
        id: project._id,
      };
      eventos.push(projectEvento);

      const fecha_inicio = project.fecha_inicio.substr(0, 10);
      const fecha_fin = project.fecha_inicio.substr(0, 10);
      for (let date = fecha_inicio; date <= fecha_fin; date = moment(date).add(1, 'days').format('YYYY-MM-DD')) {
        const fecha = date;
        if (!marked[fecha]) {
          marked[fecha] = { marked: true, dots: [] };
        }
        marked[fecha].dots.push({ color: projectEvento.color });
      }
    }
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
      backgroundColor = 'yellow';
    }

    return {
      container: {
        backgroundColor,
        borderRadius: 5,
        height: 36,
        width: 36,
        justifyContent: 'center',
        alignItems: 'center',
      },
    };
  };

  const openModal = (events, eventType) => {
    setSelectedEvents(events);
    setSelectedEventType(eventType);
    setModalVisible(true);
  };

  return (
    <ScrollView>
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
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                {selectedEvents.length === 1 ? (
                  selectedEvents.map((event) => {
                    if (event.type === 'task') {
                      return (
                        <View key={event.id}>
                          <Text style={styles.modalTitle}>{event.title}</Text>
                          <Text style={{ fontSize: 15 }}>Fecha: {event.start}</Text>
                          <Text style={styles.h3}>Descripción</Text>
                          <Text style={styles.modalDescription}>{event.description}</Text>
                        </View>
                      );
                    } else if (event.type === 'project') {
                      return (
                        <View key={event.id}>
                          <Text style={styles.modalTitle}>{event.title}</Text>
                          <Text style={{ fontSize: 15 }}>Fecha de Inicio: {event.start}</Text>
                          <Text style={{ fontSize: 15 }}>Fecha de Finalización: {event.end}</Text>
                          <Text style={styles.h3}>Descripción</Text>
                          <Text style={styles.modalDescription}>{event.description}</Text>
                          <View>
                            <Text style={styles.h3}>Tareas</Text>
                            {Object.entries(tareasPorProyecto[event.id]?.tareas).map(([estado, tareas]) => (
                              <View key={estado}>
                                <Text style={styles.h3}>{estado}</Text>
                                {tareas.map((tarea) => (
                                  <View key={tarea._id} style={styles.targTask}>
                                    <Text style={{ color: event.type === 'task' ? '#B781FB' : '#1ABCFE', fontSize: 15 }}>
                                      {tarea.titulo}
                                    </Text>
                                    <Text>Responsable: {tarea.responsable}</Text>
                                  </View>
                                ))}
                              </View>
                            ))}
                          </View>
                        </View>
                      );
                    }
                  })
                ) : (
                  // Mostrar solo título y fecha de inicio cuando hay múltiples eventos en un día
                  selectedEvents.map((event) => {
                    return (
                      <View key={event.id} style={{ backgroundColor: event.type === 'task' ? '#B781FB' : '#1ABCFE', marginTop: 10, padding: 5, borderRadius: 5 }}>
                        <Text style={styles.modalTitle} >
                          {event.title}
                        </Text>
                        <Text style={{ fontSize: 15 }}>Fecha de Inicio: {event.start}</Text>
                      </View>
                    );
                  })
                )}
              </View>

            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
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
