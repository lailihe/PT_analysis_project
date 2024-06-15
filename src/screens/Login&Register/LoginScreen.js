import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import styles from "./style";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { useAuth } from "../../auth/AuthContext";
import { LinearGradient } from 'expo-linear-gradient';

function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.35.142:5001/login", {
        name: name,
        password: password,
      });
      if (response.data.status === "ok" && response.data.token) {
        await login(response.data.token);
        navigation.navigate("MainTabs");
      } else {
        Alert.alert("로그인 실패", response.data.message || "로그인에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        Alert.alert("로그인 오류", error.response.data.message);
      } else {
        Alert.alert("로그인 오류", "서버와 통신하는 동안 문제가 발생했습니다.");
      }
    }
  };

  const navigateToRegister = () => {
    navigation.navigate("회원가입");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={['#FFDEE9', '#B5FFFC']}
        style={styles.mainContainer}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../../../assets/ch.png")}
            />
            <Text style={styles.text_header}>로그인</Text>
          </View>
          <View style={styles.loginContainer}>
            <View style={styles.action}>
              <FontAwesome name="user" size={24} color="black" />
              <TextInput
                placeholder="이름"
                style={styles.textInput}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>

            <View style={styles.action}>
              <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
              <TextInput
                placeholder="비밀번호"
                style={styles.textInput}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            <TouchableOpacity style={styles.inBut} onPress={handleLogin}>
              <View>
                <Text style={styles.textSign}>로그인</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.inBut} onPress={navigateToRegister}>
              <View>
                <Text style={styles.textSign}>회원가입</Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen;
