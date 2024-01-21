import { useState } from "react";
import Colors from "../../constants/Colors";
import { Text, View } from "../atoms/Themed";
import Title from "../atoms/Title";
import { IFormField } from "../../interfaces/FormField";

export default function FirstTaskScreen() {
    const [formFields, setFormFields] = useState<IFormField>([
        {
            name: ""
        }
    ])
    return (
        <View>
          <Title>
            Criando sua Primeira{" "}
            <Text style={{ color: Colors.dark.tint }}>Task</Text>
          </Title>
    
          
        </View>
      );
}