import type { District } from "@/config/districts";
import tw from "@/lib/tw";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
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
  districts: District[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectDistrict: (district: District) => void;
  filteredDistricts: District[];
  errors?: { district?: { message?: string } };
}

const DistrictModal: React.FC<DistrictModalProps> = ({
  visible,
  onClose,
  searchQuery,
  setSearchQuery,
  selectDistrict,
  filteredDistricts,
  errors,
}) => (
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
            onPress={() => selectDistrict(district)}
            style={tw`py-4 border-b border-border/30`}
          >
            <Text style={tw`text-white text-lg`}>{district.name}</Text>
          </Pressable>
        ))}
        {filteredDistricts.length === 0 && (
          <View style={tw`py-8 items-center`}>
            <Text style={tw`text-white/50 text-base`}>No districts found</Text>
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

export default DistrictModal;

