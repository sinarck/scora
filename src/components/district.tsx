import type { District } from "@/config/districts";
import { districts } from "@/config/districts";
import tw from "@/lib/tw";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";
import { Button } from "./ui/button";
import SearchBar from "./ui/search-bar";

const ITEM_HEIGHT = 56;

function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(undefined, args), wait);
  };
}

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
  const [filteredDistricts, setFilteredDistricts] = useState(districts);

  // Debounced filter
  const debouncedFilter = useRef(
    debounce((query: string) => {
      setFilteredDistricts(
        districts.filter((district) =>
          district.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, 200)
  ).current;

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    debouncedFilter(text);
  };

  const renderItem = ({ item }: { item: District }) => (
    <Pressable
      onPress={() => onSelect(item)}
      style={tw`py-4 border-b border-border/30 flex-row items-center justify-between`}
    >
      <Text style={tw`text-white text-lg`}>{item.name}</Text>
      {selectedDistrict === item.name && (
        <Ionicons name="checkmark" size={18} color="#fff" />
      )}
    </Pressable>
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
            <Button onPress={onClose} variant="outline" size="icon">
              <Ionicons name="close" size={18} color="#ffffff" />
            </Button>
          </View>
        </View>

        {/* Search Bar */}
        <View style={tw`px-6 py-4`}>
          <SearchBar
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search districts..."
          />
        </View>

        {/* Districts List */}
        <View style={tw`flex-1 px-6`}>
          <FlatList
            data={filteredDistricts}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.name}-${item.url}`}
            getItemLayout={(_, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
            ListEmptyComponent={() => (
              <View style={tw`py-8 items-center`}>
                <Text style={tw`text-white/50 text-base`}>
                  No districts found
                </Text>
              </View>
            )}
          />
        </View>
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

