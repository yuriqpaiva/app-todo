import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const titleExists = !!tasks.find((task) => task.title === newTaskTitle);

    if (titleExists) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [{ text: "OK" }]
      );
      return;
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks([...tasks, data]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const idExists = !!tasks.find((task) => task.id === id);

    if (!idExists) {
      return;
    }

    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }
      return task;
    });

    setTasks(updatedTasks);
  }

  function handleEditTask(id: number, taskNewTitle: string) {
    const idExists = !!tasks.find((task) => task.id === id);

    if (!idExists) {
      return;
    }

    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, title: taskNewTitle };
      }
      return task;
    });

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [{ text: "Não" }, { text: "Sim", onPress: () => onTaskDelete() }]
    );

    function onTaskDelete() {
      const data = tasks.filter((task) => task.id !== id);
      setTasks(data);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
