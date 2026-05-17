import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-8 text-blue-600">
        Quan Ly Chi Tieu
      </Text>

      <TouchableOpacity
        className="w-full bg-green-500 p-4 rounded-lg mb-4 items-center"
        onPress={() => {
          console.log("Chuyen sang trang Tong Thu");
          router.push("/income");
        }}
      >
        <Text className="text-white font-semibold text-lg">
          Tong Thu Trong Thang
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="w-full bg-red-500 p-4 rounded-lg mb-4 items-center"
        onPress={() => {
          console.log("Chuyen sang trang Tong Chi");
          router.push("/expense");
        }}
      >
        <Text className="text-white font-semibold text-lg">
          Tong Chi Trong Thang
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="w-full bg-purple-500 p-4 rounded-lg items-center"
        onPress={() => {
          console.log("Chuyen sang trang Tiet Kiem");
          router.push("/savings");
        }}
      >
        <Text className="text-white font-semibold text-lg">
          Tai Khoan Tiet Kiem
        </Text>
      </TouchableOpacity>
    </View>
  );
}
