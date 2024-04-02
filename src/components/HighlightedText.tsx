import React from 'react';
import { View, StyleSheet } from 'react-native';
import Highlighter from 'react-native-highlight-words';
import styles from '../App.styles';

interface HighlightedTextProps {
  text: string;
  highlightWords: string[];
}

const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  highlightWords, 
}) => {
  const cleanedHighlightWords = highlightWords.map(word => word.toLowerCase().trim());
  return (
    <View style={styles.container}>
      <Highlighter
        highlightStyle={styles.highlighted}
        searchWords={cleanedHighlightWords}
        textToHighlight={text}
        style={styles.text}
      />
    </View>
  );
};

export default HighlightedText;