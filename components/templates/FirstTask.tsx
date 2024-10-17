import { useState } from "react";
import Colors from "../../constants/Colors";
import { Text, View } from "../atoms/Themed";
import Title from "../atoms/Title";
import { IFormField } from "../../interfaces/FormField";
import Form from "../organisms/Form";
import { StyleSheet } from "react-native";

// This function represents the first task creation screen of the app.
export default function FirstTaskScreen() {
  const [formFields, setFormFields] = useState<IFormField[]>([
    {
      name: "name",
      label: "Nome da Task",
      placeholder: "Task",
      min: 4,
      max: 128,
      value: "",
      error: null,
    },
    {
      name: "difficulty",
      label: "Nível de Dificuldade",
      type: "select",
      options: [
        {
          label: "Muito Fácil",
          value: 0,
        },
        {
          label: "Fácil",
          value: 1,
        },
        {
          label: "Médio",
          value: 3,
        },
        {
          label: "Difícil",
          value: 4,
        },
        {
          label: "Muito Difícil",
          value: 5,
        },
      ],
      value: 0,
      error: null,
    },
    {
      name: "date",
      label: "Data",
      type: "date",
      placeholder: "##/##/####",
      value: "",
      error: null,
    },
    {
      name: "duration",
      label: "Tempo",
      type: "select",
      options: [
        {
          label: "15 minutos",
          value: "15 minutes",
        },
        {
          label: "30 minutos",
          value: "30 minutes",
        },
        {
          label: "45 minutos",
          value: "45 minutes",
        },
        {
          label: "1 hora",
          value: "1 hour",
        },
        {
          label: "2 horas",
          value: "2 hours",
        },
        {
          label: "3 horas",
          value: "3 hours",
        },
        {
          label: "5 horas",
          value: "5 hours",
        },
        {
          label: "10 horas",
          value: "10 hours",
        },
        {
          label: "12 horas",
          value: "12 hours",
        },
        {
          label: "1 dia",
          value: "1 day",
        },
        {
          label: "2 dias",
          value: "2 days",
        },
        {
          label: "3 dias",
          value: "3 days",
        },
        {
          label: "1 semana",
          value: "1 week",
        },
        {
          label: "2 semanas",
          value: "2 weeks",
        },
        {
          label: "1 mês",
          value: "1 month",
        },
      ],
      value: "1 hour",
      error: null,
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Form
          title={
            <>
              {" "}
              Criando sua Primeira{" "}
              <Text style={{ color: Colors.dark.tint }}>Task</Text>
            </>
          }
          fields={formFields}
          setFields={setFormFields}
          button={{
            label: "Próximo",
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
});
