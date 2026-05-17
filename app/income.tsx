import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface Income {
  id: string;
  name: string;
  amount: string;
}

export default function IncomeScreen() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadIncomes();
  }, []);

  const loadIncomes = async () => {
    try {
      const storedData = await AsyncStorage.getItem("incomes");
      if (storedData) {
        setIncomes(JSON.parse(storedData));
      }
    } catch (error) {
      console.log("Loi tai du lieu thu nhap");
    }
  };

  const saveIncomes = async (newData: Income[]) => {
    try {
      await AsyncStorage.setItem("incomes", JSON.stringify(newData));
      setIncomes(newData);
    } catch (error) {
      console.log("Loi luu du lieu thu nhap");
    }
  };

  const handleSave = () => {
    if (!name || !amount) {
      Alert.alert("Thong bao", "Vui long nhap day du thong tin");
      return;
    }

    if (editingId) {
      const updatedIncomes = incomes.map((item) =>
        item.id === editingId ? { ...item, name, amount } : item,
      );
      saveIncomes(updatedIncomes);
      setEditingId(null);
    } else {
      const newIncome = { id: Date.now().toString(), name, amount };
      saveIncomes([...incomes, newIncome]);
    }
    setName("");
    setAmount("");
  };

  const handleEdit = (item: Income) => {
    setName(item.name);
    setAmount(item.amount);
    setEditingId(item.id);
  };

  const handleDelete = (id: string) => {
    const filteredIncomes = incomes.filter((item) => item.id !== id);
    saveIncomes(filteredIncomes);
  };

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <View className="bg-white p-4 rounded-lg shadow mb-4">
        <TextInput
          className="border border-gray-300 p-3 rounded-lg mb-3 bg-gray-50"
          placeholder="Nguon thu"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          className="border border-gray-300 p-3 rounded-lg mb-4 bg-gray-50"
          placeholder="So tien"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <TouchableOpacity
          className="bg-green-500 p-3 rounded-lg items-center"
          onPress={handleSave}
        >
          <Text className="text-white font-bold text-lg">
            {editingId ? "Cap Nhat" : "Them Nguon Thu"}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={incomes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded-lg shadow mb-3 flex-row justify-between items-center">
            <View>
              <Text className="font-bold text-lg text-gray-800">
                {item.name}
              </Text>
              <Text className="text-green-600 font-semibold mt-1">
                {item.amount} VND
              </Text>
            </View>
            <View className="flex-row">
              <TouchableOpacity
                className="bg-yellow-500 px-4 py-2 rounded-lg mr-2"
                onPress={() => handleEdit(item)}
              >
                <Text className="text-white font-bold">Sua</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-red-500 px-4 py-2 rounded-lg"
                onPress={() => handleDelete(item.id)}
              >
                <Text className="text-white font-bold">Xoa</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
