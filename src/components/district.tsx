import type { District } from "@/config/districts";
import { districts } from "@/config/districts";
import tw from "@/lib/tw";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

interface DistrictModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (district: District) => void;
  selectedDistrict?: string;
  errors?: { district?: { message?: string } };
}

const DistrictModal: React.FC<DistrictModalProps> = ({
  visible,
  onClose,
  onSelect,
  selectedDistrict,
  errors,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDistricts = useMemo(
    () =>
      districts.filter((district) =>
        district.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={tw`flex-1 bg-background`}>
        {/* Modal Header */}
        <View style={tw`px-6 py-4 border-b border-border`}>
          <View style={tw`flex-row items-center justify-between`}>
            <Text style={tw`text-white text-xl font-semibold`}>
              Select District
            </Text>
            <Pressable
              onPress={onClose}
              style={tw`w-8 h-8 rounded-full bg-secondary items-center justify-center`}
            >
              <Ionicons name="close" size={18} color="#ffffff" />
            </Pressable>
          </View>
        </View>

        {/* Search Bar */}
        <View style={tw`px-6 py-4`}>
          <TextInput
            style={tw`bg-input border border-border rounded-xl px-4 py-3 text-white text-base`}
            placeholder="Search districts..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Districts List */}
        <ScrollView style={tw`flex-1 px-6`}>
          {filteredDistricts.map((district) => (
            <Pressable
              key={`${district.name}-${district.url}`}
              onPress={() => onSelect(district)}
              style={tw`py-4 border-b border-border/30 flex-row items-center justify-between`}
            >
              <Text style={tw`text-white text-lg`}>{district.name}</Text>
              {selectedDistrict === district.name && (
                <Ionicons name="checkmark" size={18} color="#fff" />
              )}
            </Pressable>
          ))}
          {filteredDistricts.length === 0 && (
            <View style={tw`py-8 items-center`}>
              <Text style={tw`text-white/50 text-base`}>
                No districts found
              </Text>
            </View>
          )}
        </ScrollView>
        {errors?.district && (
          <Text style={tw`text-destructive text-sm mt-2 px-6`}>
            {errors.district.message}
          </Text>
        )}
      </View>
    </Modal>
  );
};

export default DistrictModal;

