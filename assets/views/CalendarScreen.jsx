import React, { useState } from 'react';
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

function MyCalendar(props) {
  const eventos = [
    {
      title: 'Tarea 1',
      start: '2023-10-01',
      end: '2023-10-01',
      allDay: false,
      description: 'Descripción de la tarea 1',
      color: '#B781FB',
      textColor: 'white',
      id: 1,
      type: 'task',
    },
    {
      title: 'Tarea 2',
      start: '2023-10-05',
      end: '2023-10-05',
      allDay: true,
      description: 'Descripción de la tarea 2',
      color: '#B781FB',
      textColor: 'black',
      id: 2,
      type: 'task',
    }, {
      title: 'Tarea 3',
      start: '2023-10-08',
      end: '2023-10-08',
      allDay: false,
      description: 'Descripción de la tarea 3',
      color: '#B781FB',
      textColor: 'white',
      id: 20,
      type: 'task',
    },
    {
      title: 'Tarea 4',
      start: '2023-10-20',
      end: '2023-10-20',
      allDay: true,
      description: 'Descripción de la tarea 4',
      color: '#B781FB',
      textColor: 'black',
      id: 21,
      type: 'task',
    },
    {
      title: 'Proyecto 1',
      start: '2023-10-05',
      end: '2023-10-05',
      allDay: true,
      description: 'Descripción del proyecto 1',
      color: '#1ABCFE',
      textColor: 'black',
      id: 3,
      type: 'project',
    },
    {
      title: 'Proyecto 2',
      start: '2023-10-07',
      end: '2023-10-07',
      allDay: true,
      description: 'Descripción del proyecto 2',
      color: '#1ABCFE',
      textColor: 'black',
      id: 4,
      type: 'project',
    }, {
      title: 'Proyecto 3',
      start: '2023-10-21',
      end: '2023-10-21',
      allDay: true,
      description: 'Descripción del proyecto 3',
      color: '#1ABCFE',
      textColor: 'black',
      id: 30,
      type: 'project',
    },
  ];

  const marked = {};

  eventos.forEach((evento) => {
    const fecha = evento.start;

    if (!marked[fecha]) {
      marked[fecha] = { marked: true, dots: [] };
    }

    marked[fecha].dots.push({ color: evento.color });
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
            style={[styles.dayContainer, dayCustomStyle(date.dateString).container]}
            onPress={() => {
              const events = eventos.filter((e) => e.start === date.dateString);
              if (events.length > 0) {
                openModal(events, events[0].type);
              }
            }}
          >
            <Text style={[styles.dayText, dayCustomStyle(date.dateString).text]}>
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
                      
                      <View key={event.id} style={{ backgroundColor, marginTop:10, padding:5, borderRadius:5 }}>                       
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
                      <View key={event.id} >
                        <Text style={styles.modalTitle}>{event.title}</Text>
                        <Text style={{ fontSize: 15 }}>Fecha: {event.start}</Text>
                        <Text style={styles.h3}>Descripción</Text>
                        <Text style={styles.modalDescription}>{event.description}</Text>
                        {event.type === 'project' && (
                          <>
                          <View>
                            <Text style={styles.h3}>Por Hacer</Text>
                            <View style={styles.targTask}>
                              <Text style={{color:'#5969FF', fontSize:15}}>Titulo Tarea</Text>
                              <Text>Responsable Tarea</Text>
                            </View>
                          </View>
                          <View>
                            <Text style={styles.h3}>En Progreso</Text>
                            <View style={styles.targTask}>
                              <Text style={{color:'#5969FF', fontSize:15}}>Titulo Tarea</Text>
                              <Text>Responsable Tarea</Text>
                            </View>
                          </View>
                          <View>
                            <Text style={styles.h3}>Hecho</Text>
                            <View style={styles.targTask}>
                              <Text style={{color:'#5969FF', fontSize:15}}>Titulo Tarea</Text>
                              <Text>Responsable Tarea</Text>
                            </View>
                            <View style={styles.targTask}>
                              <Text style={{color:'#5969FF', fontSize:15}}>Titulo Tarea</Text>
                              <Text>Responsable Tarea</Text>
                            </View>
                            <View style={styles.targTask}>
                              <Text style={{color:'#5969FF', fontSize:15}}>Titulo Tarea</Text>
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