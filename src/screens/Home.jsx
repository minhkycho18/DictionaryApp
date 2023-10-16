import React, { useContext } from "react";
import { Button } from "react-native";
import { SafeAreaView, Text } from "react-native";
import AppLoader from "~/components/AppLoader";
import { AuthContext } from "~/context/AuthContext";
function Home() {
  const { isLoading, logout } = useContext(AuthContext);

  return (
    <>
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <Text>Welcome </Text>
        <Button title="Logout" color="red" onPress={logout} />
      </SafeAreaView>
      {isLoading ? <AppLoader /> : ''}
    </>
  );
}

export default Home;
