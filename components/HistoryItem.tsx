import React from 'react';
import {Text, Pressable} from 'react-native';
import {useNavigate} from 'react-router-native';
import ItemLanguages from './ItemLanguages';

function HistoryItem({item}) {
  const navigate = useNavigate();

  return (
    <Pressable
      onPress={() => {
        navigate(`/history/${item.id}`);
      }}
      key={item.id}
      className="my-[10px] mx-[20px] px-[10px] py-[20px] rounded-2xl bg-[#5865f2]">
      <Text className="text-[20px] font-bold mb-[8px] mx-[10px] text-white">
        {item.message}
      </Text>
      <ItemLanguages
        fromLanguage={'Braille'}
        toLanguage={'Español'}
      />
    </Pressable>
  );
}

export default HistoryItem;
