import React, { useContext } from "react";
import { View, Button } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles } from "../../../styles";
import { SettingsContext } from "../../state/context";
import { useNavigation } from "@react-navigation/native";

const EditEmailScreen = () => {
  const { settings } = useContext(SettingsContext);
  const navigation = useNavigation();
  return (
    <View>
      <Formik
        initialValues={{ email: settings.user?.email ?? "" }}
        validate={(values) => {
          let errors = {};
        }}
        onSubmit={async (values) => {
          settings.user
            ?.updateEmail(values.email)
            .then(navigation.goBack)
            .catch((error) => {
              if (error.code === "auth/email-already-in-use") {
                console.log("That email address is already in use!");
              }

              if (error.code === "auth/invalid-email") {
                console.log("That email address is invalid!");
              }
              console.error(error);
            });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
        }) => (
          <View style={globalStyles.column}>
            <TextInput
              style={globalStyles.inputBox}
              autoCapitalize="none"
              autoCompleteType="email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              placeholder="Email"
              value={values.email}
            />
            {!settings.user?.emailVerified && (
              <Button
                color={globalStyles.submitButton.backgroundColor}
                onPress={() => settings.user?.sendEmailVerification()}
                title="Send verification email"
              />
            )}
            <Button
              color={globalStyles.submitButton.backgroundColor}
              onPress={() => handleSubmit()}
              title="Change email"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
export default EditEmailScreen;
