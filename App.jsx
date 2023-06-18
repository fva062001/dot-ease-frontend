import {SafeAreaView} from "react-native";
import History from "./Pages/History";
import {NativeRouter, Route, Routes, Link} from "react-router-native";
import TranlationDetail from "./Pages/TranslationDetail";
import MainLayout from "./Layouts/MainLayout";
import CameraPage from "./Pages/CameraPage";

export default function App() {
  return (
    <NativeRouter>
      <SafeAreaView>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <MainLayout title={"Historial"}>
                <History />
              </MainLayout>
            }
          />
          <Route
            path="/history/:id"
            element={
              <MainLayout title={"Detalle"}>
                <TranlationDetail />
              </MainLayout>
            }
          />
          <Route path="/camera" element={<CameraPage />} />
        </Routes>
      </SafeAreaView>
    </NativeRouter>
  );
}
